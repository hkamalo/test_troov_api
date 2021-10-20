const mongoose = require('mongoose');

/* ----------------------- DB CONNECTION -----------------------------------------*/

// session config
const sessionConfig = {
  mongoUrl: 'mongodb://localhost:27017/troovDB',
  collectionName: 'Session',
};

// init db connection
const mongoDbConnection = mongoose.createConnection(
  'mongodb://localhost:27017/troovDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = { mongoDbConnection, sessionConfig };
