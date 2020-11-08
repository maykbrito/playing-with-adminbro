require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const server = express()

const admin = require('./admin/router')
const User = require('./pages/User')
const Home = require('./pages/Home')

server
  .use(express.json())
  // routes
  .use('/admin', admin)
  .get("/", Home.index)
  .get("/api/users", User.index)



const init = async() => {
    const { MONGO_URL, PORT } = process.env

    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    server.listen(PORT, () => console.log("Server started"))
}

init();