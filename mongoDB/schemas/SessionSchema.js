const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  session: Object,
  expireDate: Date,
});

module.exports = SessionSchema;
