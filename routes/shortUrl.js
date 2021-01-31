const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

// router.get("/", async (req, res) => {
//     const shortUrl = await ShortUrl.find();
//   });

router.get("/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  console.log(shortUrl);
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.redirect(shortUrl.full);
});

router.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  await ShortUrl.create({ full: fullUrl });
  const shortUrl = await ShortUrl.findOne({ full: fullUrl });
  console.log(JSON.parse(JSON.stringify(shortUrl)));
  res.json({ full: fullUrl, short: "localhost:5000/" + shortUrl.short });
});
module.exports = router;
