const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomMemberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classroomId: { type: String, default: '', required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student', required: true },
}, {
    minimize: false,
    timestamps: true
  });

classroomMemberSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ClassroomMember', classroomMemberSchema);
