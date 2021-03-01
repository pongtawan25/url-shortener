const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/l/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  // const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  //findAll maybe better than fineOne
  const shortUrl = await ShortUrl.findById(shortUrls);
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.status(302).json({
    Location: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${link}`,
  })
  shortUrl.visit =  shortUrl.visit+1;
  console.log("get this path");
});


router.get("/l/:shortUrls/stats", async (req, res) => {
  const { shortUrls } = req.params;
  // const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  //findAll maybe better than fineOne
  const shortUrl = await ShortUrl.findById(shortUrls);
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.status(200).json({
    visit : shortUrls.visit 
  })
  console.log("get this path");
});

router.post("/link", async (req, res) => {
  const { url } = req.body;
  const shortUrl = await ShortUrl.findOne({ url: url });
  // let checkUrl = url.substring(0, 8);
  // if (!url) {
  //   res.status(404).json({
  //     status: "Bad Request",
  //     message: "Not found any request from user, please try again later",
  //   });
  // } else if (checkUrl !== "https://") {
  //   res.status(404).json({
  //     status: "Bad Request",
  //     message: `Full link is incorrect, please start with 'https://' `,
  //   });
  // } else {
  if (shortUrl) {
    res.status(200).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${shortUrl.link}`,
    });
  } else {
    const data = await ShortUrl.create({ url: url });
    const { link } = data;
    data.visit =  data.visit+1;

    res.status(201).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${link}`,
    });
    
  }
  // }
});

module.exports = router;
