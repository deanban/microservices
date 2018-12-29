const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const URLSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    shortURL: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = UrlShortener = mongoose.model("urlshortener", URLSchema);
