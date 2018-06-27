const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
  title: { type: String, default: '' },
  editors: { type: Object, default: {} },
  editorIndex: { type: Number, default: 0 },
  layout: { type: Array, default: [] },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder' }
}, { minimize: false });

module.exports = mongoose.model('Page', pageSchema);
