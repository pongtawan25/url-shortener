const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + "/.env" });
var MongoClient = require("mongodb").MongoClient;
const { nanoid } = require("nanoid");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = `mongodb://${process.env.DB_IP}/?maxPoolSize=600&poolSize=500`;
MongoClient.connect(uri, (error, client) => {
  if (error) throw error;
  var db = client.db("urlShortener");

  app.get("/", (req, res) => {
    res.send("Hello World, Url-shortener Test MongoDB");
  });
  app.post("/link", async (req, res) => {
    const { url } = req.body;
    let gen_id = nanoid(3);
    await db.collection("shorturls").insertOne({
      url: url,
      link: gen_id,
      visit: 0,
    });
    res.status(200).json({
      link: `http://sh.${process.env.VM_NAME}.tnpl.me/l/${gen_id}`, //sh.${process.env.VM_NAME}.tnpl.me
    });
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
  //! : เป็นการเชื่อม port ว่าเราจะไป portไหน
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("server started : " + PORT);
  });
});
