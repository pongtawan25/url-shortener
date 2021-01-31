const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const routeShortUrl = require('./routes/shortUrl')

const app = express();

const PORT = process.env.PORT || 5000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(routeShortUrl)

app.listen(PORT, () => {
  console.log("Server is starting port : "+ PORT);
});
