const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  location: { adress: String, postcode: Number, city: String, country: String },
  email: String,
  hashedPassword: String,
});

module.exports = UserSchema;
