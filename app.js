const express = require('express');
const user = require('./models/user');
const app = express();
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images")

app.use(express.json());
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/image",imageRoute);


module.exports = app