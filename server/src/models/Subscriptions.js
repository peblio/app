const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionsSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  amount: { type: Schema.Types.Boolean, required: true},
  paid_date: { type: Schema.Types.Date, required: true },
}, {
    minimize: false,
    timestamps: true,
  });

module.exports = mongoose.model('Subscriptions', subscriptionsSchema);
