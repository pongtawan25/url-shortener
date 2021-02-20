const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

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
  let checkUrl = url.substring(0, 8);
  if (!url) {
    res.status(404).json({
      status: "Bad Request",
      message: "Not found any request from user, please try again later",
    });
  } else if (checkUrl !== "https://") {
    res.status(404).json({
      status: "Bad Request",
      message: `Full link is incorrect, please start with 'https://' `,
    });
  } else {
    if (shortUrl != null) {
      res.status(200).json({
        link: `sh.${process.env.VM_NAME}.tnpl.me/l/` + shortUrl.short,
      });
    } else {
      const data = await ShortUrl.create({ full: url });
      const { short } = data;
      res.status(201).json({
        link: `sh.${process.env.VM_NAME}.tnpl.me/l/` + short,
      });
    }
  }
});

module.exports = router;
