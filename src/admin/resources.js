const User = require("../models/User");
const Article = require("../models/Article");

const ArticleResource = {
  resource: Article,
  options: {
    properties: {
      body: { type: "richtext" },
      created_at: {
        isVisible: { edit: false, list: true, show: true, filter: true },
      },
    },
  },
};

module.exports = [User, ArticleResource]