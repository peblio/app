const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
  title: { type: String, default: '' },
  preview: { type: Boolean, default: false },
  editors: { type: Object, default: {} },
  editorIndex: { type: Number, default: 0 },
  layout: { type: Array, default: [] },
  createDate: {type: Date, default:''},
  updateDate: {type:Date, default:''}
}, { minimize: false });

module.exports = mongoose.model('page', pageSchema);
