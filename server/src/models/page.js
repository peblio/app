const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
  title: { type: String, default: '' },
  heading: { type: String, default: '' },
  description: { type: String, default: '' },
  editors: { type: Object, default: {} },
  editorIndex: { type: Number, default: 0 },
  layout: { type: Array, default: [] },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  workspace: { type: Object, default: {} },
  tags: [String]
  }, {
    minimize: false,
    timestamps: true
  });

module.exports = mongoose.model('Page', pageSchema);
