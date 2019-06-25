const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageVersionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
  version_id: { type: String, default: '' },
  title: { type: String, default: '' },
  heading: { type: String, default: '' },
  snapshotPath: { type: String },
  description: { type: String, default: '' },
  editors: { type: Object, default: {} },
  editorIndex: { type: Number, default: 0 },
  layout: { type: Array, default: [] },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  workspace: { type: Object, default: {} },
  isPublished: { type: Boolean },
  tags: [String]
}, {
    minimize: false,
    timestamps: true
  });

module.exports = mongoose.model('PageVersion', pageVersionSchema);
