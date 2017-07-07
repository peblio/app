const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: '' },
  password: { type: String }
});

export default mongoose.model('User', userSchema);
