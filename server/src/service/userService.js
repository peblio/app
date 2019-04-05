const User = require('../models/user.js');
const Page = require('../models/page.js');

export function getUserProfile(req, res) {
  User.findOne({ name: req.params.userName }, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      res.status(statusCode).send(err);
    } else {
      res.send({
        name: user.name,
        type: user.type,
        image: user.image,
        blurb: user.blurb,
        isOwner: !!(req.user && req.user.name && req.user.name === user.name)
      });
    }
  });
}

export function getUserDetailsById(req, res) {
  return getUserById(req.params.userObjectId, res);
}

export function getUserDetailsForPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    } else {
      return getUserById(page.user, res);
    }
  });
};

export function getUserDetailsForParentPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    Page.findOne({ id: page.parentId}, (parentPageRetrieveError, parentPage) => {
      if (parentPageRetrieveError || !parentPage) {
        const statusCode = parentPageRetrieveError ? 500 : 404;
        return res.status(statusCode).send(parentPageRetrieveError);
      }
      return getUserById(parentPage.user, res);
    });
  });
};

function getUserById(userId, res) {
  return User.findById(userId, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    return res.status(200).send({
      name: user.name,
      type: user.type
    });
  });
}
