const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/l/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;

  // console.log(shortUrls);
  const shortUrl = await ShortUrl.findOne({ link: shortUrls });

  // setTimeout(async function () {
  await shortUrl.updateOne({ visit: shortUrl.visit + 1 });
  // console.log("updated");
  // }, 10000);

  res.status(302).redirect(shortUrl.url);
});

router.get("/l/:shortUrls/stats", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ link: shortUrls });

  res.status(200).json({
    visit: shortUrl.visit,
  });
  console.log("get this path");
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

    res.status(201).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${link}`,
    });
  }
  // }
});

module.exports = router;
