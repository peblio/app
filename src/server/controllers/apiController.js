var express = require('express');
var Router = express.Router();
const Page = require('../models/page.js');

var apiRoutes = express.Router();

apiRoutes.route('/pages/:id').get(getPage);

function getPage(req,res) {
  Page.find({id:req.params.id},function(err,data){
    if(err){
        res.send(err);
    }
    else{
      console.log(data);
        res.send(data);
        }
  });
}

module.exports = apiRoutes;
