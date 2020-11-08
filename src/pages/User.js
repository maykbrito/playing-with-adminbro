const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.find({}).limit(10);
    res.send(users);
  }
};