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
  const url  = req.body.full;
  const shortUrl = await ShortUrl.findOne({ full: url });
  // console.log(url);
  // console.log(shortUrl);
  if (shortUrl != null) {
    // Created already
    console.log("1");
    res.status(200).json({ link: `sh.${process.env.VM_NAME}.tnpl.me/l/` + shortUrl.short });
  } else {
    // Not Create
    // console.log("2");
    const data = await ShortUrl.create({ full: url });
    const { short } = data;
    // console.log(url);
    res.status(200).json({ link:  `sh.${process.env.VM_NAME}.tnpl.me/l/` + short });
  }
});

module.exports = router;
