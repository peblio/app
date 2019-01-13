const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  });


const Tag = mongoose.model('Tag', tagSchema);

export function buildTagFromRequest(request) {
  return new Tag({ name: request.body.name });
}

export default Tag;
