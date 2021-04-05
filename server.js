const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
var MongoClient = require("mongodb").MongoClient;
const { nanoid } = require("nanoid");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.x39qb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const uri = `mongodb://${process.env.DB_IP}`;
MongoClient.connect(uri, (error, client) => {
  if (error) throw error;
  var db = client.db("urlShortener");

  app.get("/", (req, res) => {
    res.send("Hello World, Url-shortener Test MongoDB");
  });
  app.post("/link", async (req, res) => {
    console.log('check in method');
    const { url } = req.body;
    //console.log(url);
      console.log("Server: Post - 1");
      let gen_id = nanoid(3);
      console.log(gen_id);
      const data = await db.collection("shorturls").insertOne({
        url: url,
        link: gen_id,
        visit: 0 
      })
      console.log(...data.ops);
      res.status(200).json({
        link: `http://localhost:5000/l/${gen_id}`,//sh.${process.env.VM_NAME}.tnpl.me
      });
    
  });
  app.get("/l/:shortUrls", async (req, res) => {
    const { shortUrls } = req.params;
    // console.log(shortUrls);
    const result = await db.collection('shorturls').findOneAndUpdate(
      {link: shortUrls},
      {$inc: {visit:1}}
    )
     return res.status(302).redirect(result.value.url);
  });
  app.get("/l/:shortUrls/stats", async (req, res) => {
    const { shortUrls } = req.params;
    const shortUrl = await db.collection('shorturls').findOne({ link: shortUrls });
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
