const express = require("express");
const commentController = require('../controllers/comments.controller');
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

// router.get("/", postController.index);
router.post("/save", checkAuth.checkAuth, commentController.save);
router.get("/show/:id", checkAuth.checkAuth, commentController.show);
router.patch("/edit/:id", checkAuth.checkAuth, commentController.update);
router.delete("/:id", checkAuth.checkAuth, commentController.destroy);




module.exports = router;