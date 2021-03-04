const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/l/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ link: shortUrls });
  await shortUrl.updateOne({ visit: shortUrl.visit + 1 });
  res.status(302).redirect(shortUrl.url);
});

router.get("/l/:shortUrls/stats", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ link: shortUrls });
  res.status(200).json({
    visit: shortUrl.visit,
  });
});

router.post("/link", async (req, res) => {
  const { url } = req.body;
  const shortUrl = await ShortUrl.findOne({ url });
  if (shortUrl) {
    res.status(200).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${shortUrl.link}`,
    });
  } else {
    const data = await ShortUrl.create({ url: url });
    const { link } = data;
    res.status(200).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${link}`,
    });
  }
});

module.exports = router;
