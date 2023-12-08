const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:  { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true},
  id_product: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
