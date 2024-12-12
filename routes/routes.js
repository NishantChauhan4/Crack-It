const express = require("express");
const isAuthenticated = require("../middleware/middleware");
const {
  home,
  signup,
  login,
  create,
  userLogin,
  select,
  logout,
  submit,
  submitQuestions,
  viewQuestions,
  aboutus,
  contact,
} = require("../controller/controller");

const router = express.Router();

router.get("/", home);

router.get("/signup", signup);

router.get("/login", login);

router.post("/signup", create);

router.post("/login", userLogin);

router.get("/select", isAuthenticated, select);

router.get("/logout", logout);

router.get("/submitQuestions", isAuthenticated, submit);

router.post("/submitQuestions", isAuthenticated, submitQuestions);

router.get("/viewQuestions", isAuthenticated, viewQuestions);

router.post("/viewQuestions", isAuthenticated, viewQuestions);

router.get("/aboutus", aboutus);

router.get("/contact", contact);

module.exports = router;
