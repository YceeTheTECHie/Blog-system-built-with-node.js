const express = require('express');
const user = require('./models/user');
const app = express();
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");


app.use(express.json());
app.use("/post", postRoute);
app.use("/user", userRoute);


module.exports = app