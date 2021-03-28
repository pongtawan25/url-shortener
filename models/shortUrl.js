const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  5
);

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
  link: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  },
  visit: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
