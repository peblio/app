var express = require('express');
var Router = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

var apiRoutes = express.Router();

apiRoutes.route('/page/:id').get(getPage);
apiRoutes.route('/user').get(getUser);
apiRoutes.route('/sketches').get(getSketches);

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

module.exports = apiRoutes;
