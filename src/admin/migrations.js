#!/usr/bin/env node
require("dotenv").config();
const argon2 = require("argon2");
const mongoose = require("mongoose");

const Role = require("../app/imodels/Role");
const User = require("../app/models/User");

const { MONGO_URL } = process.env;

init();
async function init() {
  console.log("Initing migrations");

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to", MONGO_URL);

  console.log();
  console.log("\x1b[34mCreating Role");

  const roleId = mongoose.Types.ObjectId();
  await new Role({
    _id: roleId,
    name: "Super Admin",
    super_admin: true,
  }).save();

  console.log("Creating User");

  const password = await argon2.hash("admin");
  await new User({
    email: "admin@admin.com",
    password: password,
    role: roleId,
  }).save();

  await mongoose.disconnect();
  console.log();
  console.log("\x1b[42m\x1b[37m", "Migration finished\x1b[0m");
  console.log("User: \x1b[4madmin@admin.com\x1b[0m");
  console.log("Password: \x1b[4madmin\x1b[0m");
}
