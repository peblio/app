const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: String, default: '' },
  id: { type: String, default: '' },
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
  deletedAt: { type: Date, default: null },
  tags: [String]
}, {
    minimize: false,
    timestamps: true
  });

pageSchema.plugin(mongoosePaginate);

pageSchema.pre('find', function() {
  this.where('deletedAt', null);
});

module.exports = mongoose.model('Page', pageSchema);
