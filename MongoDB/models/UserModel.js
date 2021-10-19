const mongoose = require("mongoose");

const schema = mongoose.Schema({
	username: String,
    hashedPassword: String,
})

module.exports = mongoose.model("User", schema)