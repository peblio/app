const mongoose = require('mongoose');

const { Page } = require('../models');

mongoose.Promise = Promise;
console.log('Updating db...');
mongoose.connect(process.env.MONGO_DB_PEBLIO, { useMongoClient: true })
  .then(() => Page.find().exec())
  .then(pages => Promise.all(pages.map((page) => {
    const editors = page.editors;
    let pageHasEditor = false;
    Object.values(editors).forEach((editor) => {
      if (editor.type === 'code') {
        editor.editorView = 'split';
        pageHasEditor = true;
      }
    });
    if (pageHasEditor && page.user) {
      page.markModified('editors');
      return page.save();
    }
  })))
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
