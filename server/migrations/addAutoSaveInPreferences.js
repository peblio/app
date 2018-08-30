const mongoose = require('mongoose');

const { User } = require('../models');

mongoose.Promise = Promise;

console.log('Updating db...');
mongoose.connect(process.env.MONGO_DB_PEBLIO, { useMongoClient: true })
  .then(() => User.find({}).exec())
  .then(users => Promise.all(users.map((user) => {
    user.preferences.editorAutoSave = true;

    return user.save();
  })))
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
