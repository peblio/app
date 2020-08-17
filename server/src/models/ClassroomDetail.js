const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomDetailSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: String, default: '', required: true },
  name: { type: String, default: '', required: true },
  room: { type: String, default: '' },
  description: { type: String, default: '' },
  subject: { type: String, default: '' },
  grade: { type: String, default: '' }
}, {
    minimize: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

classroomDetailSchema.plugin(mongoosePaginate);
classroomDetailSchema.virtual('members', {
  ref: 'ClassroomMember',
  localField: 'id',
  foreignField: 'classroomId',
  justOne: false,
});

module.exports = mongoose.model('ClassroomDetail', classroomDetailSchema);
