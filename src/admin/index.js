const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");

const config = require('./config')

AdminBro.registerAdapter(AdminBroMongoose); // use mongoose in AdminBro

module.exports = new AdminBro(config);