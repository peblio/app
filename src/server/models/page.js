const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  id: {type: String, default:''},
  title: { type: String, default: '' }
});

module.exports = mongoose.model('page', pageSchema);
