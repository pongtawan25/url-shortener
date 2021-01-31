const express = require("express");
const mongoose = require("mongoose");
const app = express();

const ShortUrl = require("./models/shortUrl");

app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/:shortUrls", async (req, res) => {
  const { shortUrls } = req.params;
  const shortUrl = await ShortUrl.findOne({ short: shortUrls });
  if (shortUrl == null) {
    res.send("Url Not Found");
  }
  res.redirect(shortUrl.full);
});   

app.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  await ShortUrl.create({ full: fullUrl });
  const shortUrl = await ShortUrl.findOne({ full: fullUrl });
  res.json({ full: fullUrl, short: "localhost:5000/" + shortUrl.short });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running...");
});
