const express = require("express");
const { nanoid } = require("nanoid");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const uri = `mongodb://${process.env.DB_IP}/urlShortener/?poolSize=700`;
MongoClient.connect(uri, { useUnifiedTopology: true }, (error, client) => {
  if (error) throw error;
  var db = client.db("urlShortener");

  app.get("/", (req, res) => {
    res.send("Welcome to Url-Shortener API service");
  });

  app.post("/link", async (req, res) => {
    const { url } = req.body;
    let gen_id = nanoid(5);
    let result;
    try {
      result = await db.collection("shorturls").insertOne(
        {
          url: url,
          link: gen_id,
          visit: 0,
        },
        // {
        //   writeConcern: { w: 0, j: true },
        // }
      );
      res.status(200).json({
        link: `http://sh.a2.tnpl.me/l/${gen_id}`,
      });
    } catch (error) {
      const data = await db.collection("shorturls").findOne({
        url: url,
      });
      res.status(200).json({
        link: `http://sh.a2.tnpl.me/l/${data.link}`,
      });
    }
  });

  app.get("/l/:shortUrls", async (req, res) => {
    const { shortUrls } = req.params;
    const result = await db
      .collection("shorturls")
      .findOneAndUpdate({ link: shortUrls }, { $inc: { visit: 1 } });
    return res.status(302).redirect(result.value.url);
  });

  app.get("/l/:shortUrls/stats", async (req, res) => {
    const { shortUrls } = req.params;
    const shortUrl = await db
      .collection("shorturls")
      .findOne({ link: shortUrls });
    res.status(200).json({
      visit: shortUrl.visit,
    });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("server started : " + PORT);
  });
});
