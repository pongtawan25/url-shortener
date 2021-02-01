const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("1234567890abcdefhijklmnopqrstuvwxyz", 5);
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
