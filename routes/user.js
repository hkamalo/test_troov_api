const UserRouter = require('express').Router();
const ObjectModel = require('../mongoDB/models/ObjectModel');

// object creation
UserRouter.post('/:userId/object', async (req, res) => {
  const { userId } = req.params;
  const { name, description, lostDetails, ticketCreatedAt } = req.body;

  try {
    const newObject = await ObjectModel.createNewObject(
      userId,
      name,
      description,
      lostDetails,
      ticketCreatedAt
    );
    return res.status(200).send(`object stored :${newObject}`);
  } catch (error) {
    return res.status(401).send(`error in object creation : ${error}`);
  }
});

// object update
UserRouter.patch('/:userId/object/:objectId', async (req, res) => {
  const { userId } = req.params;
  const { objectId } = req.params;
  const { name, description, lostDetails} = req.body;

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

// get user's objects list

UserRouter.get('/:userId/object', async (req, res) => {
  const { userId } = req.params;

  try {
    const objectsList = await ObjectModel.getObjectList(userId);
    return res.status(200).send(`list of objects :${objectsList}`);
  } catch (error) {
    return res.status(401).send(`error : ${error}`);
  }
});

module.exports = UserRouter;
