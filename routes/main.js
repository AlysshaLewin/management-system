const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const formController = require("../controllers/form");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/add-user", postsController.addUser);
router.get("/update-user", ensureAuth, postsController.updateUser);


// API
router.post('/api/users', ensureAuth, formController.create);
//router.get('/api/users', ensureAuth, formController.find);
router.put('/api/users/:id', ensureAuth, formController.update);
router.delete('/api/users/:id', ensureAuth, formController.delete);


module.exports = router;
