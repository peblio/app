const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  children: [{ type: Schema.Types.ObjectId, ref: 'Folder', autopopulate: { maxDepth: 10 } }],
  files: [{ type: Schema.Types.ObjectId, ref: 'Page', autopopulate: true }],
  title: { type: String, default: '' },
});

folderSchema.plugin(autopopulate);

module.exports = mongoose.model('Folder', folderSchema);
