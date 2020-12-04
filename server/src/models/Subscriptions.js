const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionsSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  amount: { type: Schema.Types.Number, required: true},
  paidDate: { type: Schema.Types.Date, required: true },
  isActive: { type: Schema.Types.Boolean, required: true },
  endDate: { type: Schema.Types.Date},
}, {
    minimize: false,
    timestamps: true,
  });

module.exports = mongoose.model('Subscriptions', subscriptionsSchema);
