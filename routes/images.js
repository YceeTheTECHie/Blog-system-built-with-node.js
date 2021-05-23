const express = require("express");
const imageController = require("../controllers/image.controller");
const imageUploader = require("../helpers/image-uploader");
const checkAuth = require("../middlewares/check-auth");


const router = express.Router();

router.post("/upload", checkAuth.checkAuth, imageUploader.upload.single('images'), imageController.upload);
module.exports = router;    