const ObjectSchema = require('../schemas/ObjectSchema');
const mongoDbconnection = require('../config/dbconfig.js');

const ObjectModel = mongoDbconnection.model('Session', ObjectSchema);

const createNewObject = async (ObjectToStore) => {
  const newObject = await ObjectModel.create(ObjectToStore);

  return newObject;
};

const findObject = () => ObjectModel.find({});

const updateObject = (ObjectId, elementToChange) => ObjectModel.updateOne({id: ObjectId}, elementToChange)

const deleteObject = (ObjectId) => ObjectModel.remove({id: ObjectId})

module.exports = {
  createNewObject,
  findObject,
  updateObject,
  deleteObject
};
