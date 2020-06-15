const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomMemberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classroomId: { type: String, default: '', required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student', required: true },
  isActive: { type: Boolean, default: true, required: true },
}, {
    minimize: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

classroomMemberSchema.plugin(mongoosePaginate);
classroomMemberSchema.virtual('userDetail', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('ClassroomMember', classroomMemberSchema);
