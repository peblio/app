const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  files: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
  title: { type: String, default: '' },
});

module.exports = mongoose.model('Folder', folderSchema);
