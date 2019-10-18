const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  amountInCents: {
    type: Number,
    required: true,
    unique: false
  },
  contributionId: {
    type: String,
    required: true,
    unique: false
  },
  stripeResponseId: {
    type: String,
    required: true,
    unique: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});

module.exports = mongoose.model('Contribution', contributionSchema);
