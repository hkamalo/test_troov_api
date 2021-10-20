const ObjectSchema = require('../schemas/ObjectSchema');
const { mongoDbConnection } = require('../config/dbconfig.js');

const ObjectModel = mongoDbConnection.model('Object', ObjectSchema);

const createNewObject = async (
  userId,
  name,
  description,
  lostDetails,
) => {
  const newObject = await ObjectModel.create({
    userId,
    name,
    description,
    lostDetails: {
      adress: lostDetails.adress,
      date: new Date(lostDetails.date[0], lostDetails.date[1],lostDetails.date[2], ),
    },
    ticketCreatedAt: new Date(),
  });

  return newObject;
};

const getObjectList = (inputUserID) =>
  ObjectModel.find({ userID: inputUserID }).exec();

const updateObject = (inputUserId, inputObjectId, elementToChange) =>
  ObjectModel.updateOne(
    { id: inputObjectId, userId: inputUserId },
    elementToChange
  ).exec();

const deleteObject = (inputUserId, inputObjectId) =>
  ObjectModel.deleteOne({
    id: inputObjectId,
    userId: inputUserId,
  }).exec();

module.exports = {
  createNewObject,
  getObjectList,
  updateObject,
  deleteObject,
};
