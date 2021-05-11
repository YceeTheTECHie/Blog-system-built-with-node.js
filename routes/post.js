const express = require("express");
const postController = require('../controllers/posts.controllers');

const router = express.Router();

router.get("/", postController.index);


module.exports = router