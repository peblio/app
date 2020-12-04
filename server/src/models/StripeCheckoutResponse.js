const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stripeCheckoutResponseSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  success: { type: Schema.Types.Boolean, required: true},
  payload: { type: Object, required: true },
}, {
    minimize: false,
    timestamps: true,
  });

module.exports = mongoose.model('SripeCheckoutResponse', stripeCheckoutResponseSchema);
