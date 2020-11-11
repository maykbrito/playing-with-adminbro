const AdminBroExpress = require("@admin-bro/express");
const AdminBro = require('.');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userModel = require('../app/models/User')
const roleModel = require('../app/models/Role')

const { authenticationClosure } = require('./auth')

const authenticate = authenticationClosure({
    userModel, roleModel
})

const options = {
    cookieName: 'admin-bro',
    cookiePassword: "fOcUs",
    authenticate, 
    resave:false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
}

module.exports = AdminBroExpress.buildAuthenticatedRouter(AdminBro, options);