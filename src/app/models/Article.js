const { Schema, model } = require("mongoose");

const Article = new Schema({
  title: String,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Article", Article);
