const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const routeShortUrl = require("./routes/shortUrl");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.x39qb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const uri = `mongodb://${process.env.DB_IP}/urlShortener`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  // poolSize: 200,
  // autoIndex: true,
  // serverSelectionTimeoutMS: 5000,
  // socketTimeoutMS: 45000,
  // family: 4
});

app.use(routeShortUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is starting port : " + PORT);
});
