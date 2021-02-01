const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

// router.get("/", async (req, res) => {
//     const shortUrl = await ShortUrl.find();
//   });

router.get("/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.redirect(shortUrl.full);
});

router.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = await ShortUrl.findOne({ full: fullUrl });
  if (shortUrl) {
    // res.send("CREATED success");
    res.json({ full: fullUrl, short: "localhost:5000/" + shortUrl.short });
  } else {
    const data = await ShortUrl.create({ full: fullUrl });
    // res.send("CREATED ALREADY");
    const { full ,short} = data;
    res.json({ full: full, short: "localhost:5000/" + short });
  }
});
module.exports = router;
