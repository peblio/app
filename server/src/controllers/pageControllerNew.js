const Page = require('../models/page.js');
const User = require('../models/user.js');

export async function getPage(req, res) {
  return Page.find({ id: req.params.pageId }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data);
  });
}

export async function getPagesWithTag(req, res) {
  return Page.find({ tags: req.query.tag }, (err, data) => {
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
    const hydratedUser = await User.findOne({ _id: user._id }).exec();
    await User.update({ _id: user._id }, { pages: hydratedUser.pages.concat(req.body.id) }).exec();

    const page = new Page({ ...req.body, user: user._id });
    const savedPage = await page.save();
    return res.send({ page: savedPage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
