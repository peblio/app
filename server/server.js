const mongoose = require('mongoose');
// use the native Promise object for Mongoose's promises
mongoose.Promise = Promise;
const bodyParser = require('body-parser');
const express = require('express'); // include the express library
const path = require('path');
const passport = require('passport');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const session = require('express-session');

const userRoutes = require('./controllers/userController.js');
const pageRoutes = require('./controllers/pageController.js');
const folderRoutes = require('./controllers/folderController');
const apiRoutes = require('./controllers/apiController.js');

require('./config/passport');

// start the server:
app.listen(process.env.PORT || 8080);

mongoose.connect('mongodb://localhost:27017/peblio-file');
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongoose.connection.on('open', () => {
  console.log('MongoDB Connection success.');
  // process.exit(1);
});

app.use(session({
  secret: 'ASQ12345678gfd4jh234oiuy',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.resolve(__dirname, './static')));
// add body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/pages', pageRoutes);
app.use('/folders', folderRoutes);
app.use('/api', apiRoutes);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
