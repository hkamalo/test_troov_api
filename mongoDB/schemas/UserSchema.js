const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    adress: String,
    hashedPassword: String,
  });

  
  module.exports = UserSchema;