const ObjectSchema = require('../schemas/ObjectSchema');
const mongoDbconnection = require('../config/dbconfig.js');

const ObjectModel = mongoDbconnection.model('Session', ObjectSchema);

module.exports = ObjectModel;
