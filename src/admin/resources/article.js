const Article = require("../../app/models/Article");
const { isAccessGranted } = require("../auth");

const resourceName = "Article"

const properties = {
  body: { type: "richtext" },
  created_at: {
    isVisible: {
      edit: false,
      list: true,
      show: true,
      filter: true,
    },
  },
};

const actions = {
  list: {
    // Added the role policy
    isAccessible: isAccessGranted({
      resourceName,
      actionRequested: "list",
    }),
  },
  edit: {
    isAccessible: isAccessGranted({
      resourceName,
      actionRequested: "list",
    }),
  },
  //...etc
};

const features = [];

module.exports = {
  resource: Article,
  options: {
    properties,
    actions,
  },
  features
};