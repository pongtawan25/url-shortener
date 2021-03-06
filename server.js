const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + "/.env" });
const routeShortUrl = require("./routes/shortUrl");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.x39qb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const uri = `mongodb://10.1.0.6:27017/urlShortener`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(routeShortUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is starting port : " + PORT);
});
