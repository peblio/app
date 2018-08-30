const mongoose = require('mongoose');

const { User } = require('../models');

mongoose.Promise = Promise;

console.log('Updating db...');
mongoose.connect(process.env.MONGO_DB_PEBLIO, { useMongoClient: true })
  .then(() => User.update(
    {},
    { $set: { 'preferences.editorAutoSave': true } },
    { multi: true },
    (err, result) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log('Done!');
        process.exit(0);
      }
    }).exec());
