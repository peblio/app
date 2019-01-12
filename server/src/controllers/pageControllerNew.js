const Page = require('../models/page.js');

export async function getPage(req, res) {
  return Page.find({ id: req.params.pageId }, (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.send(data);
  });
}
