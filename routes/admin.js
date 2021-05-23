const express = require("express");
const adminController = require('../controllers/admins.controller');
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

// router.get("/", postController.index);
router.post("/signup", adminController.signUp);
router.post("/login",adminController.login);
router.delete("/user/:id",checkAuth.checkAuth,adminController.destroyUser);
router.delete("/post/:id",checkAuth.checkAuth,adminController.destroyPost);



// router.get("/show/:id", checkAuth.checkAuth, commentController.show);
// router.patch("/edit/:id", checkAuth.checkAuth, commentController.update);
// router.delete("/:id", checkAuth.checkAuth, commentController.destroy);


 

module.exports = router;