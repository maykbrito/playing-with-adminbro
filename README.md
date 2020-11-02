# Create an Admin in a few minutes

https://adminbro.com

We will play with AdminBro to create our CRUD

## Enviroment

We will need

1. Code Editor
2. Node.js
3. Mongo
4. Terminal
5. Curl



## Basic Server

1. Create structure

   ```sh
   mkdir project
   cd project
   touch server.js
   ```

2. Install dependencies

   ```sh
   npm i express mongoose 
   ```

3. server.js

   ```js
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
   
   // Run App
   (async () => {
     await mongoose.connect("mongodb://localhost/adminbro", {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });
   
     await server.listen(5500, () => console.log("Server started"));
   })();
   ```

4. Start server

   ```sh
   node server.js
   ```

5. Put some data

   ```sh
   curl -d '{"user": {"email": "mydog@half.com", "name": "MyDog"}}' -H "Content-Type: application/json" -X POST http://localhost:5500/users
   ```

6. Check data

   ```sh
   curl http://localhost:5500/users | less
   ```



## With Admin Bro

1. Install dependencies

   ```sh
   npm i admin-bro @admin-bro/mongoose @admin-bro/express mongoose express express-formidable
   ```

2. admin.js

   ```js
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
   	resources: [User, Article],
     rootPath
   })
   const adminBroRouter = AdminBroExpress.buildRouter(adminBroOptions)
   server.use(rootPath, adminBroRouter)
   
   
   
   // ============================================
   // Run App
   (async () => {
     await mongoose.connect("mongodb://localhost/adminbro", {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });
   
     await server.listen(5500, () => console.log("Server started"));
   })();
   ```

   

## Customize

https://adminbro.com/tutorial-customizing-resources.html

1. Change company name, Article name and add options to resource

```js
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
```





### References

https://www.youtube.com/watch?v=n0IuXnL_cWs

https://www.youtube.com/watch?v=aqTE8fr-t5M