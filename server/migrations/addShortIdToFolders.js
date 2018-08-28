const mongoose = require('mongoose');
const shortid = require('shortid');

const { Folder } = require('../models');

mongoose.Promise = Promise;

console.log('Updating db...');
mongoose.connect(process.env.MONGO_DB_PEBLIO, { useMongoClient: true })
  .then(() => Folder.find({ shortId: { $exists: false } }).exec())
  .then(folders => Promise.all(folders.map((folder) => {
    folder.shortId = shortid.generate();
    return folder.save();
  })))
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
