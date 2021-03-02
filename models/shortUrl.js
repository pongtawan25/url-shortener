const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",5);

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    default: nanoid,
  },
  visit: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
