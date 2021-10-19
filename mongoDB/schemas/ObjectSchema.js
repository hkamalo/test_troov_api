const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  name: String,
  description: String,
  lossAdress: String,
  lossDate: Date,
  ticketCreatedAt: Date,
});

module.exports = ObjectSchema;