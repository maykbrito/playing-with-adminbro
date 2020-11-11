require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require("express")
const server = express()

const admin = require('./admin/router')
const User = require('./app/controllers/UserController')

server
  .use(express.json())
  .use(cors())
  // routes
  .use('/admin', admin)
  .get("/api/users", User.index)
  .get("/api/users/:id", User.getOne)


const run = async() => {
    const { MONGO_URL, PORT } = process.env

    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    server.listen(PORT, () => console.log("Server started"))
}

run();