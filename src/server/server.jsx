const mongoose = require('mongoose');

const express = require('express'); // include the express library

const app = express();

// start the server:
app.listen(process.env.PORT ||8080);
app.use('/', express.static('src/client/')); // set a static file directory

// mongoose.connect('mongodb://localhost:27017/p5js-web-editor');
// mongoose.connection.on('error', () => {
//   console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
//   process.exit(1);
// });
// mongoose.connection.on('open', () => {
//   console.log('MongoDB Connection success.');
//   // process.exit(1);
// });
