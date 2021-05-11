const express = require('express');
const app = express();
const postRoute = require("./routes/post");

app.use(express.json());
app.use("/post", postRoute);

module.exports = app