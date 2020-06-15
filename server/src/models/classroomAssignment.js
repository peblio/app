const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomAssignmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classroomId: { type: String, default: '', required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  dueDate: { type: Date},
  description: { type: String},
  isPublished: { type: Boolean, required: true },
  peblUrls: [String],
  urls: [String],
}, {
    minimize: false,
    timestamps: true,
  });

classroomAssignmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ClassroomAssignment', classroomAssignmentSchema);
