const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express'); // include the express library
const path = require('path');
const passport = require('passport');

require('dotenv').config();

const app = express();
const session = require('express-session');

const srcpath = path.join(__dirname, '../client');
const userRoutes = require('./controllers/userController.js');
const pageRoutes = require('./controllers/pageController.js');
const folderRoutes = require('./controllers/folderController');
const apiRoutes = require('./controllers/apiController.js');
const profileRoutes = require('./controllers/profileController.js');

require('./config/passport');

// start the server:
app.listen(process.env.PORT || 8080);
app.use('/', express.static('src/client/')); // set a static file directory

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
app.use(express.static(path.resolve(__dirname, '../static')));
// add body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/pages', pageRoutes);
app.use('/folder', folderRoutes);
app.use('/api', apiRoutes);
app.use('/profile', profileRoutes);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// call by default index.html page
app.get('*', (req, res) => {
  res.sendFile(`${srcpath}/index.html`);
});
