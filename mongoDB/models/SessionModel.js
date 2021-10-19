const SessionSchema = require('../schemas/SessionSchema');
const mongoDbconnection = require('../config/dbconfig.js');

const SessionModel = mongoDbconnection.model('Session', SessionSchema);

const findSession = (sessionId) => SessionModel.findById(sessionId).exec();

module.exports = { findSession };
