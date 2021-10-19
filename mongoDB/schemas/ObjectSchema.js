const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  name: String,
  description: String,
  lostDetails: { adress: String, date: Date },
  ticketCreatedAt: Date,
});

module.exports = ObjectSchema;
