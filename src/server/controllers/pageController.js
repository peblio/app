var express = require('express');
var Router = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

var pageRoutes = express.Router();

pageRoutes.route('/save').post(savePage);
pageRoutes.route('/update').post(updatePage);

function savePage(req,res) {
  var user = req.user;
  var newList = [];
  if(user) {
    console.log(user);

    User.find({_id:user._id}, function(err,data) {
      if(err) {
        res.send(err);
        console.log("fail");
      }
      else {
        console.log(data[0].pages);
        data[0].pages.push(req.body.id);
        User.update({_id:user._id}, {
          pages: data[0].pages
        },
        function(err,data){
          if(err){
              res.send(err);
          }
          else{
               // res.send({data:"Record has been Inserted..!!"});
          }
        });
    }
  });

    var mod = new Page(req.body);
    mod.save(function(err,data){
      if(err){
          res.send(err);
      }
      else{
           res.send({data:"Record has been Inserted..!!"});
      }
    });
  }
  else {
    res.status(403).send({ error: 'Please log in first' })
  }
}

function updatePage(req, res) {
  Page.update({id:req.body.id},{
    title: req.body.title,
    editors: req.body.editors,
    indexEditor: req.body.indexEditor,
    textEditors: req.body.textEditors,
    indexTextEditor: req.body.indexTextEditor,
    iframes: req.body.iframes,
    indexIframe: req.body.indexIframe,
  },
  function(err,data){
    if(err){
        res.send(err);
    }
    else{
         res.send({data:"Record has been Inserted..!!"});
    }
  });
}

module.exports = pageRoutes;
