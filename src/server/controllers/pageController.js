var express = require('express');
var Router = express.Router();
const Page = require('../models/page.js');

var pageRoutes = express.Router();

pageRoutes.route('/save').post(savePage);
pageRoutes.route('/update').post(updatePage);
// pageRoutes.route('/:id').get(getPage);

function savePage(req,res) {
  console.log(req.body);
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

function updatePage(req, res) {
  Page.update({id:req.body.id},{
    title: req.body.title,
    editors: req.body.editors,
    indexEditor: req.body.indexEditor,
    textEditors: req.body.textEditors,
    indexTextEditor: req.body.indexTextEditor
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

function getPage(req,res) {
  console.log(req.params.id);
  Page.find({id:req.params.id},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
}

module.exports = pageRoutes;
