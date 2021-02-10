const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const routeShortUrl = require("./routes/shortUrl");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const uri =
  `mongodb+srv://timtan:${process.env.MONGO_PASS}@cluster0.x39qb.mongodb.net/urlShortener?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(routeShortUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is starting port : " + PORT);
});
