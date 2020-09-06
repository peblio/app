const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomStudentAssignmentAttemptSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classroomId: { type: String, default: '', required: true },
    assignmentId: { type: String, default: '', required: true },
    myPeblUrl: { type: String, default: '', required: true },
    turnedIn: { type: Boolean, default: 'false', required: true },
    comments: [{
      fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      text: { type: String, required: true },
      time: { type: Date, default: Date.now, required: true },
      }]
    }, {
    minimize: false,
    timestamps: true,
    toJSON: { virtuals: true },
  });

  classroomStudentAssignmentAttemptSchema.plugin(mongoosePaginate);
  classroomStudentAssignmentAttemptSchema.virtual('assignmentDetail', {
    ref: 'ClassroomAssignment',
    localField: 'assignmentId',
    foreignField: 'id',
    justOne: true,
  });

module.exports = mongoose.model('ClassroomStudentAssignmentAttempt', classroomStudentAssignmentAttemptSchema);
