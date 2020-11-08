const AdminBroExpress = require("@admin-bro/express");
const AdminBro = require('.');

module.exports = AdminBroExpress.buildRouter(AdminBro);