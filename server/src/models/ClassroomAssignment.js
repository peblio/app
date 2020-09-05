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
  peblUrl: { type: String},
  url: { type: String},
  type: { type: String, enum: ['assignment', 'material'], default: 'assignment', required: true },
  topicId: { type: Schema.Types.ObjectId, ref: 'ClassroomTopic' },
}, {
    minimize: false,
    timestamps: true,
  });

classroomAssignmentSchema.plugin(mongoosePaginate);
classroomAssignmentSchema.virtual('classroomDetail', {
  ref: 'ClassroomDetail',
  localField: 'id',
  foreignField: 'classroomId',
  justOne: false,
});

module.exports = mongoose.model('ClassroomAssignment', classroomAssignmentSchema);
