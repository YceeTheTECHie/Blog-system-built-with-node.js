const express = require('express');
const app = express();
const postRoute = require("./routes/post");

app.use("/posts", postRoute);

module.exports = app