const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, minlength: 1, required: true},
  email: {type: mongoose.SchemaTypes.Email, required: true, unique: true},
  password: {type: String, minlength: 2, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;