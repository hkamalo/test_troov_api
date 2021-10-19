const mongoose = require('mongoose');

// init db connection
const connection = async () => {
   await mongoose
  .connect('mongodb://localhost:27017/troovDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })};

// add error handler
const mongoDbConnection = connection().catch(err => console.log(err));

  module.exports = mongoDbConnection;