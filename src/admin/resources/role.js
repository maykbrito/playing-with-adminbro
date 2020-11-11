const { isAccessGranted } = require("../auth");

const Role = require("../../app/models/Role");

const resourceName = "Role";

const properties = [];
const actions = {
  search: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "show" }),
  },
  show: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "show" }),
  },
  list: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "list" }),
  },
  new: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "edit" }),
  },
  edit: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "edit" }),
  },
  delete: {
    isAccessible: isAccessGranted({ resourceName, actionRequested: "delete" }),
  },
  bulkDelete: {
    isAccessible: isAccessGranted({
      resourceName,
      actionRequested: "bulkDelete",
    }),
  },
};
const features = [];

module.exports = {
  resource: Role,
  options: {
    properties,
    actions,
  },
  features,
};
