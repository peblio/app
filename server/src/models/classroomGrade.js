const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomGradeSchema = new Schema({
    name: { type: String, default: '', required: true },
  }, {
    minimize: false,
    timestamps: true,
  });

classroomGradeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ClassroomGrade', classroomGradeSchema);
