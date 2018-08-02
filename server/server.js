const mongoose = require('mongoose');
// use the native Promise object for Mongoose's promises
mongoose.Promise = Promise;
const bodyParser = require('body-parser');
const express = require('express'); // include the express library
const passport = require('passport');
const cors = require('cors');

const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRoutes = require('./controllers/userController.js');
const pageRoutes = require('./controllers/pageController.js');
const folderRoutes = require('./controllers/folderController');
const apiRoutes = require('./controllers/apiController.js');
const profileRoutes = require('./controllers/profileController.js');

require('./config/passport');

// start the server:
const listener = app.listen(process.env.PORT || 8081, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

mongoose.connect(process.env.MONGO_DB_PEBLIO);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongoose.connection.on('open', () => {
  console.log('MongoDB Connection success.');
});

app.use(cors({ credentials: true, origin: true }));

// Basic usage
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'ASQ12345678gfd4jh234oiuy',
  proxy: true,
  name: 'peblioSessionId',
  unset: 'destroy',
  cookie: {
    // domain: 'peblio.co',
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
router.use('/users', userRoutes);
router.use('/pages', pageRoutes);
router.use('/folders', folderRoutes);
router.use('/profile', profileRoutes);
router.use('/', apiRoutes);
app.use('/api', router);

app.get('/api/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.sendStatus(200);
});

app.get('/healthcheck', (req, res) => res.sendStatus(200));

console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
