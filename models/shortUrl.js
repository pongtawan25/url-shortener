const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  3
);
const findOneOrCreate = require("mongoose-findoneorcreate");

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    default: nanoid,
    unique:true
  },
  visit: {
    type: Number,
    default: 0,
    required: true,
  },
});
shortUrlSchema.plugin(findOneOrCreate);
module.exports = mongoose.model("ShortUrl", shortUrlSchema);
