const Page = require('../models/page.js');
const User = require('../models/user.js');

export async function getPage(req, res) {
  return Page.find({ id: req.params.pageId }, (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.send(data);
  });
}

export async function getExamples(req, res) {
  return User.find({ name: 'peblioexamples' }, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send(userFindError);
    }
    return Page.find({ user: user[0]._id }, (pageFindError, page) => {
      if (pageFindError) {
        return res.status(500).send(pageFindError);
      }
      return res.status(200).send(page);
    });
  });
}
