const PageVersion = require('../models/pageversion.js');
const Page = require('../models/page.js');

export async function savePageVersion(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  if (!req.body.id) {
    return res.status(200).send();
  }
  try {
    const pageVersion = new PageVersion({ ...req.body, user: user._id, version_id: Math.round(new Date().getTime()/1000) });
    const savedPageVersion = await pageVersion.save();
    const currentPageVersions = await PageVersion.find({ id: savedPageVersion.id}).sort([['createdAt']]).exec();
    if(currentPageVersions.length > 15){
      await PageVersion.deleteOne({id: currentPageVersions[0].id, version_id: currentPageVersions[0].version_id}).exec();
    }
    return res.send({ pageVersion: savedPageVersion });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function get(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  try {
    const { version, id } = req.query;
    const page = await Page.findOne({ id }).exec();
    if(!page || (page.trashedAt && page.deletedAt)){
      return res.status(404).send();
    }
    if(!version){
      const pageVersions = await PageVersion.find({ id}).sort([['createdAt']]).exec();
      return res.status(200).send({ data: pageVersions });
    }
    const pageVersions = await PageVersion.find({ id, version_id: version} ).exec();
    return res.send({ data: pageVersions });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
