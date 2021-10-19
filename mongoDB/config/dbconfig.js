const mongoose = require('mongoose');

/* ----------------------- DB CONNECTION -----------------------------------------*/
// init db connection
const mongoDbConnection = mongoose
    .createConnection('mongodb://localhost:27017/troovDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));



module.exports = mongoDbConnection;
