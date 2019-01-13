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

module.exports = mongoose.model('Tag', tagSchema);
