const Page = require('../models/page.js');

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
