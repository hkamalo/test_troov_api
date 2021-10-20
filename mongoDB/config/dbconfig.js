const MongoStore = require('connect-mongo').default;
const mongoose = require('mongoose');

/* ----------------------- DB CONNECTION -----------------------------------------*/

// session config
const sessionConfig = {
    mongoUrl: 'mongodb://localhost:27017/troovDB',
    collectionName: 'Session',
  }

const MongoSessionStoring = MongoStore.create(sessionConfig);

// init db connection
const mongoDbConnection = mongoose.createConnection(
  'mongodb://localhost:27017/troovDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = { mongoDbConnection, MongoSessionStoring };
