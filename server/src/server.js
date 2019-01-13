require("babel-core/register");
require("babel-polyfill");
const mongoose = require('mongoose');
// use the native Promise object for Mongoose's promises
mongoose.Promise = Promise;
const bodyParser = require('body-parser');
import express from 'express';
import userRoutes from './controllers/userController';
import examplesRoutes from './controllers/examplesController';
import tagRoutes from './controllers/tagController';
const passport = require('passport');
const cors = require('cors');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const currentUserRoutes = require('./controllers/currentUserController');
const authRoutes = require('./controllers/authController.js');
const pageRoutes = require('./controllers/pageController.js');
const folderRoutes = require('./controllers/folderController');
const apiRoutes = require('./controllers/apiController.js');

require('./config/passport');

app.use(cors({ credentials: true, origin: true }));

// Basic usage
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.PEBLIO_SESSION_SECRET,
  proxy: true,
  name: process.env.PEBLIO_COOKIE_NAME,
  unset: 'destroy',
  cookie: {
    domain: process.env.PEBLIO_COOKIE_DOMAIN,
    httpOnly: false,
    secure: false,
  },
  store: new MongoStore({
    url: process.env.MONGO_DB_PEBLIO,
    autoReconnect: true
  })
}));
// add body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add routes
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
router.use('/current_user', currentUserRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pages', pageRoutes);
router.use('/folders', folderRoutes);
router.use('/examples', examplesRoutes);
router.use('/tags', tagRoutes);
router.use('/', apiRoutes);
app.use('/api', router);

app.get('/api/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.sendStatus(200);
});

app.get('/healthcheck', (req, res) => res.sendStatus(200));

function startServer() {
  const listener = app.listen(process.env.SERVER_PORT || 8081, () => {
    console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    console.log(`Listening on port ${listener.address().port}`);
  });
}

mongoose.connect(process.env.MONGO_DB_PEBLIO, { useMongoClient: true });
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongoose.connection.on('open', () => {
  console.log('MongoDB Connection success.');
  startServer();
});
