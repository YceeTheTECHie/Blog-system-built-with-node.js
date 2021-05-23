const express = require("express");
const postController = require('../controllers/posts.controllers');
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();


router.get("/all", postController.index);
router.post("/create", checkAuth.checkAuth, postController.createPosts);
router.get("/:id", postController.showPost);
router.patch("/:id",checkAuth.checkAuth, postController.update);
router.delete("/:id", checkAuth.checkAuth, postController.destroy);



module.exports = router