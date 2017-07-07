const Users = require('../models/users');

exports.createUser = function(req,res) {
  const name = req.body.name;
  const password = req.body.password;

  let user = new Users({
    name: name,
    password: password
  });

  user.save(function(err, user){
    if (err) { console.log('error'); }
    console.log('no error?');
  })
}
