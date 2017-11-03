const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express'); // include the express library
const path = require("path");

const app = express();
const Page = require('./models/page.js');
const srcpath  =path.join(__dirname,'../client') ;
// start the server:
app.listen(process.env.PORT ||8080);
app.use('/', express.static('src/client/')); // set a static file directory

mongoose.connect('mongodb://localhost:27017/peblio');
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongoose.connection.on('open', () => {
  console.log('MongoDB Connection success.');
  // process.exit(1);
});

// add body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//api for save data to database
app.post("/save",function(req,res){
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
})

//api for update data in database
app.post("/update",function(req,res){
    console.log(req.body);
    // var mod = new Page(req.body);
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
})

app.get("/sketch/:id",function(req,res){
  console.log
  Page.find({id:req.params.id},function(err,data){
    if(err){
        res.send(err);
    }
    else{
        res.send(data);
        }
  });

})

// call by default index.html page
app.get("*",function(req,res){
    res.sendFile(srcpath +'/index.html');
})
