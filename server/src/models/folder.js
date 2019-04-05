const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const shortid = require('shortid');

const { Schema } = mongoose;

const folderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  title: { type: String, default: '' },
  shortId: { type: String, default: shortid.generate, required: true, unique: true },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

folderSchema.virtual('children', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'parent',
  autopopulate: { maxDepth: 10 } // maxDepth is the limit for folder nesting
});

folderSchema.virtual('files', {
  ref: 'Page',
  localField: '_id',
  foreignField: 'folder',
  autopopulate: true
});

folderSchema.plugin(autopopulate);

module.exports = mongoose.model('Folder', folderSchema);
