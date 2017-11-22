var express = require('express');
var Router = express.Router();

const Page = require('../models/page.js');
const User = require('../models/user.js');
const passport = require('passport');

var apiRoutes = express.Router();

apiRoutes.route('/page/:id').get(getPage);
apiRoutes.route('/user').get(getUser);
apiRoutes.route('/sketches').get(getSketches);
apiRoutes.route('/login').post(loginUser);

function getPage(req,res) {
  Page.find({id:req.params.id},function(err,data){
    if(err){
        res.send(err);
    }
    else{
        res.send(data);
        }
  });
}

function getUser(req,res) {
  res.send(req.user);
}

function getSketches(req,res) {
  let sketches =[];
  let globalerr;
  if(req.user){
    let user = req.user;
    console.log(user.pages);
    Page.find({id:{$in:user.pages}}, function(err,data) {
      if(err) {
        res.send(err);
      } else {
        res.send(data);

      }
    });

  }

}

function loginUser(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send(401,{ success : false, message : 'authentication failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.send({ success : true, message : 'authentication succeeded', user: user });
    });
  })(req, res, next);
}

module.exports = apiRoutes;
