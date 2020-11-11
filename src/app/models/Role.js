const { Schema, model, modelNames } = require("mongoose");

const allModels = [...modelNames(), "Role"]

const Role = new Schema({
  name: {
    type: String,
    required: true,
  },
  super_admin: {
    type: Boolean,
    required: false,
  },
  grants: [
    {
      resource: {
        type: String,
        enum: allModels,
      },
      actions: [
        {
          action: {
            type: String,
            enum: [
              "*",
              "search",
              "show",
              "list",
              "new",
              "edit",
              "delete",
              "bulkDelete",
            ],
          },
        },
      ],
    },
  ],
});

module.exports = model("Role", Role);
