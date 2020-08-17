const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;

const classroomTopicSchema = new Schema({
  classroomId: { type: String, default: '', required: true },
  name: { type: String, default: '', required: true },
}, {
    minimize: false,
    timestamps: true,
  });

classroomTopicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ClassroomTopic', classroomTopicSchema);
