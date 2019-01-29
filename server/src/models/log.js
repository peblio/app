const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  info: { type: String },
  stacktrace: { type: String },
  module: { type: String, default: 'client' },
  path: { type: String, required: true },
  action: { type: String, required: true },
  level: { type: String, default: 'ERROR' },
  occurredAt: { type: Date, default: Date.now }
}, {
    minimize: false,
    timestamps: true
  });

logSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Log', logSchema);
