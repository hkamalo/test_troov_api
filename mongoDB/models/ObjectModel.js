const ObjectSchema = require('../schemas/ObjectSchema');
const { mongoDbConnection } = require('../config/dbconfig.js');

const ObjectModel = mongoDbConnection.model('Session', ObjectSchema);

const createNewObject = async (
  userId,
  name,
  description,
  lostDetails,
  ticketCreatedAt
) => {
  const newObject = await ObjectModel.create({
    userId,
    name,
    description,
    lostDetails: {
      adress: lostDetails.adress,
      date: lostDetails.date,
    },
    ticketCreatedAt,
  });

  return newObject;
};

const getObjectList = (inputUserID) => ObjectModel.find({userID: inputUserID}).exec();

const updateObject = (inputUserId, inputObjectId, elementToChange) =>
  ObjectModel.updateOne({ id: inputObjectId, userId: inputUserId }, elementToChange).exec();

const deleteObject = (ObjectId) => ObjectModel.findByIdAndDelete(ObjectId).exec();

module.exports = {
  createNewObject,
  getObjectList,
  updateObject,
  deleteObject,
};
