const ObjectSchema = require('../schemas/ObjectSchema');
const { mongoDbConnection } = require('../config/dbconfig.js');

const ObjectModel = mongoDbConnection.model('Session', ObjectSchema);

const createNewObject = async (ObjectToStore) => {
  const newObject = await ObjectModel.create(ObjectToStore);

  return newObject;
};

const getObjectList = () => ObjectModel.find({});

const updateObject = (ObjectId, elementToChange) =>
  ObjectModel.updateOne({ id: ObjectId }, elementToChange);

const deleteObject = (ObjectId) => ObjectModel.findByIdAndDelete(ObjectId);

module.exports = {
  createNewObject,
  getObjectList,
  updateObject,
  deleteObject,
};
