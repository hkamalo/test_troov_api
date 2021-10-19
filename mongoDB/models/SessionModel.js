const SessionSchema = require('../schemas/SessionSchema');
const mongoDbconnection = require('../config/dbconfig.js');

const SessionModel = mongoDbconnection.model('Session', SessionSchema);



module.exports = SessionModel;