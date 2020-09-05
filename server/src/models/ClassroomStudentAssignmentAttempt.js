const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomStudentAssignmentAttemptSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classroomId: { type: String, default: '', required: true },
    assignmentId: { type: String, default: '', required: true },
    myPeblUrl: { type: String, default: '', required: true },
  }, {
    minimize: false,
    timestamps: true,
  });

  classroomStudentAssignmentAttemptSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ClassroomStudentAssignmentAttempt', classroomStudentAssignmentAttemptSchema);
