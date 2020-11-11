const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.find({}).populate('role').limit(10);

    res.send(users);
  },
  async getOne(req, res) {
    const id = req.params.id

    const user = await User.find({ _id: id })
      
    res.send(user);
  }

};