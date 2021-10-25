const UserRouter = require('express').Router();
const ObjectModel = require('../mongoDB/models/ObjectModel');

// object creation
UserRouter.post('/:userId/object', async (req, res) => {
  const { userId } = req.params;
  const { name, description, lostDetails} = req.body;

  try {
    const newObject = await ObjectModel.createNewObject(
      userId,
      name,
      description,
      lostDetails,
    );
    return res.status(200).send(newObject);
  } catch (error) {
    return res.status(401).send(error);
  }
});

// get user's objects list
UserRouter.get('/:userId/object', async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  
  try {
    const objectsList = await ObjectModel.getObjectList(userId);
    return res.status(200).send(objectsList);
  } catch (error) {
    return res.status(401).send(`error : ${error}`);
  }
});

// object update
UserRouter.patch('/:userId/object/:objectId', async (req, res) => {
  const { userId } = req.params;
  const { objectId } = req.params;
  const { name, description, lostDetails } = req.body;

  try {
    const updatedObject = await ObjectModel.updateObject(userId, objectId, {
      name,
      description,
      lostDetails,
    });
    return res.status(200).send(`object updated :${updatedObject}`);
  } catch (error) {
    return res.status(401).send(`error in udpating object: ${error}`);
  }
});

// delete user's objects list
UserRouter.delete('/:userId/object/:objectId', async (req, res) => {
  const { userId } = req.params;
  const { objectId } = req.params;

  try {
    const deletedObject = await ObjectModel.deleteObject(userId, objectId);
    return res.status(200).send(`object deleted :${deletedObject}`);
  } catch (error) {
    return res.status(401).send(`error in deleting object : ${error}`);
  }
});

module.exports = UserRouter;
