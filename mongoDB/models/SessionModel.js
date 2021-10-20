const SessionSchema = require('../schemas/SessionSchema');
const {mongoDbConnection} = require('../config/dbconfig.js');

const SessionModel = mongoDbConnection.model('Session', SessionSchema);

const findSession = (sessionId) => SessionModel.findById(sessionId).exec();

module.exports = { findSession };
