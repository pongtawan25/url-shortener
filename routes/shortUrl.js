const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/l/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOneAndUpdate(
    { link: shortUrls },
    { $inc: { visit: 1 } }
  );
  console.log("Server 1: Redirect");
  res.status(302).redirect(shortUrl.url);
});

router.get("/l/:shortUrls/stats", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ link: shortUrls });
  console.log("Server 1: Get Stat");
  res.status(200).json({
    visit: shortUrl.visit,
  });
});

router.post("/link", async (req, res) => {
  const { url } = req.body;
  // const shortUrl = await ShortUrl.findOne({ url });
  // if (shortUrl) {
  // console.log("Server 1: Post");
  //  res.status(200).json({
  //   link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${shortUrl.link}`,
  //  });
  // } else {
  const data = await ShortUrl.findOneOrCreate({ url }, { url: url });
  console.log("Server 1: Post");
  return res.status(200).json({
    link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${data.link}`,
  });
  // const data = await ShortUrl.create({ url: url });
  //  const { link } = data;
  //  console.log("Server 1: Post");
  //  res.status(200).json({
  //   link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${link}`,
  //  });
  // }
});

module.exports = router;
