const authentificationRouter = require('express').Router();
const UserModel = require('../mongoDB/models/UserModel');



authentificationRouter.post('/login', async (req, res) => {
    const {username: inputUsername, password: inputPassword} = req.body;
    


});

  module.exports = authentificationRouter;