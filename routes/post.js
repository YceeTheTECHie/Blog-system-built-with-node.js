const express = require("express");
const postController = require('../controllers/posts.controllers');

const router = express.Router();
router.get("/", postController.index);
router.post("/create", postController.createPosts);
router.get("/:id", postController.showPost);
router.patch("/:id", postController.update);
router.delete("/:id", postController.destroy);



module.exports = router