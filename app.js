const express = require('express');
const user = require('./models/user');
const app = express();
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images")
const commentRoute = require("./routes/comments");
const adminRoute = require("./routes/admin");


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/image",imageRoute);
app.use("/comment", commentRoute);
app.use("/admin", adminRoute);




module.exports = app