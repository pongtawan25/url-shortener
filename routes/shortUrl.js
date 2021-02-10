const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/", (req, res) => {
  res.send("Wellcom to URL Shortener");
});

router.get("/l/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.status(302).redirect(shortUrl.full);
});

router.post("/link", async (req, res) => {
  const { url } = req.body;
  const shortUrl = await ShortUrl.findOne({ full: url });
  if (shortUrl) {
    // Created already
    res.status(200).json({ link: "sh.a2.tnpl.me/l/" + shortUrl.short });
  } else {
    // Not Create
    const data = await ShortUrl.create({ full: url });
    const { short } = data;
    res.status(200).json({ link: "sh.a2.tnpl.me/l/" + short });
  }
});

module.exports = router;
