const Page = require('../models/page.js');

export async function getPage(req, res) {
  Page.find({ id: req.params.pageId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}
