const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
  title: { type: String, default: '' },
  heading: { type: String, default: '' },
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

pageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Page', pageSchema);
