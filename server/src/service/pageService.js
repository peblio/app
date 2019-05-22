const Page = require('../models/page.js');
const User = require('../models/user.js');
const Folder = require('../models/folder.js');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
const bucket = process.env.S3_BUCKET;
import { buildPageForUpdateFromRequest } from '../models/creator/pageCreator';

export async function getPage(req, res) {
 return Page.find({
   id: req.params.pageId
 }, (err, data) => {
   if (err) {
     return res.status(500).send(err);
   }
   if(!data || !data.length){
     return res.status(404).send();
   }
   return res.status(200).send(data);
 });
}


export async function getPagesWithTag(req, res) {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const sort = req.query.sort ? req.query.sort : 'title';
  var query = {
    tags: req.query.tag,
    $or: [{ isPublished: true }, { isPublished: null }]
  };
  var options = {
    offset,
    limit,
    sort
  };
  return Page.paginate(query, options, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data);
  });
}

export async function getMyPagesWithTag(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  const tags = req.query.tag;
  return Page.find({ user: user._id, tags}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data);
  });
}

export async function savePageAsGuest(req, res) {
  try {
    const hydratedUser = await User.findOne({ name: 'peblioguest' }).exec();

    const page = new Page({ ...req.body, user: hydratedUser._id });
    const savedPage = await page.save();
    return res.status(200).send({ page: savedPage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function savePage(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  try {
    const page = new Page({ ...req.body, user: user._id });
    const savedPage = await page.save();
    return res.send({ page: savedPage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function deletePage(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  const { pageId } = req.params;
  const pageToBeDeleted = await Page.findOne({ _id: pageId }).exec();
  if(pageToBeDeleted.user._id.equals(user._id)){
    try {
      await Page.update(
        { _id: pageId },
        { deletedAt: Date.now() }
      );
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
  return res.status(403).send({ error: 'You do not have the permissions to delete this page' });
}

export async function updatePage(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  const pageWithUpdatedData = buildPageForUpdateFromRequest(req);
  return findPageAndUpdate(req, res, user, pageWithUpdatedData);
}

export function uploadPageSnapshotToS3(req, res) {
  const fileName = `_Pebl_Snapshots/${req.body.id}.png`;
  const buffer = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const params = {
    Bucket: bucket,
    Key: fileName,
    Body: buffer,
    ContentType: 'img/png',
    ContentEncoding: 'base64',
    ACL: 'public-read'
  };
  var deleteParams = {
    Bucket: bucket,
    Key: fileName
  };
  return s3.deleteObject(deleteParams, () => {
    return s3.putObject(params, (uploadImageError, response) => {
      if (uploadImageError) {
        return res.status(500).send(uploadImageError);
      }
      return Page.update(
        { id: req.body.id },
        { snapshotPath: `https://s3.amazonaws.com/${bucket}/${fileName}` },
        (pageUpdateErr, data) => {
          if (pageUpdateErr) {
            return res.status(500).send(err);
          } else {
            return res.status(200).send();
          }
        });
    });
  });
}

export async function movePage(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { pageId } = req.params;
  const { folderId } = req.body;

  try {
    const page = await Page.findOne({ _id: pageId}).exec();
    if (!page) {
      return res.status(404).send({ error: `Page with id ${pageId} not found` });
    }
    // if we're given a folder ID, move the page to that folder
    if (folderId) {
      // check if folder exists, but don't actually fetch the folder
      const folderCount = await Folder.count({ _id: folderId, user: user._id }).exec();
      if (!folderCount) {
        return res.status(404).send({ error: `Folder with id ${folderId} not found` });
      }
      page.folder = folderId;
      // otherwise, move the page to the top level (remove its folder ID)
    } else {
      page.folder = undefined;
      // could not use delete page.folder -
      // https://stackoverflow.com/questions/33239464/javascript-delete-object-property-not-working
    }
    const savedPage = await page.save();
    return res.status(200).send({ page: savedPage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

function findPageAndUpdate(req, res, user, pageWithUpdatedData) {
  return Page.findOne({ id: req.body.id }, (pageFindError, retrievedPage) => {
    if (pageFindError || !retrievedPage || !retrievedPage.user) {
      return res.status(500).send({ error: 'Could not retrieve page!'});
    }
    if (retrievedPage.user.toString() !== user._id.toString()) {
      return res.status(403).send({ error: 'Missing permission to update page' });
    }
    return Page.update({ id: req.body.id }, pageWithUpdatedData, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send();
      }
    });
  });
}
