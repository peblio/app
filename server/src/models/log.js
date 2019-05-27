const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  user: { type: String },
  message: { type: String, required: true },
  info: { type: String },
  stacktrace: { type: String },
  module: { type: String, enum: ['community-ui', 'ui', 'server'], default: 'community-ui' },
  path: { type: String, required: true },
  action: { type: String, required: true },
  level: { type: String, enum: ['ERROR', 'INFO', 'DEBUG', 'TRACE', 'WARN'], default: 'ERROR' },
  occurredAt: { type: Date, default: Date.now }
}, {
    minimize: false,
    timestamps: true
  });

logSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Log', logSchema);
