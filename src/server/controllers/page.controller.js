const Users = require('../models/page');

exports.createUser = function(req,res) {
  const title = req.body.title;

  let user = new Page({
    title: title
  });

  page.save(function(err, user){
    if (err) { console.log('error'); }
    console.log('no error?');
  })
}
