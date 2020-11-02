// ============================================
// Database
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
});

const User = mongoose.model("User", UserSchema);

const ArticleSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", ArticleSchema);

// ============================================
// Server
const express = require("express");
const server = express();

server
  .use(express.json())
  // routes
  .get("/", (req, res) => res.send("homepage"))
  .get("/users", async (req, res) => {
    const users = await User.find({}).limit(10);
    res.send(users);
  })
  .post("/users", async (req, res) => {
    const user = await new User(req.body.user).save();
    res.send(user);
  });


// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

// config
const rootPath = '/admin'
const adminBroOptions = new AdminBro({
	resources: [
    User,
    { resource: Article, options: {
      properties: {
        body: { type: 'richtext' },
        created_at: {
          isVisible: { edit: false, list: true, show: true, filter: true }
        }
      }
   }},],
   branding: {
    companyName: 'MegaHack',
  },
  locale: {
    translations: {
      labels: {
        Article: 'Amazing Article'
      }
    }
  },
  rootPath
})
const adminBroRouter = AdminBroExpress.buildRouter(adminBroOptions)
server.use(rootPath, adminBroRouter);



// ============================================
// Run App
(async () => {
  await mongoose.connect("mongodb://localhost/adminbro", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await server.listen(5500, () => console.log("Server started"));
})();