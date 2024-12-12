const { credentials, questions } = require("../model/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function home(req, res) {
  res.render("index.ejs");
}

function signup(req, res) {
  res.render("signup.ejs",{userTaken:null});
}

function login(req, res) {
  res.render("login.ejs");
}

async function create(req, res) {
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(reqPassword, 10);

  const userFound = await credentials.findOne({ username: reqUsername });

  if (userFound != null && reqUsername === userFound.username) {
    res.render("signup.ejs",{userTaken:"Username already taken"});
  } else {
    await credentials.create({
      username: reqUsername,
      password: hashedPassword,
    });

    res.send("Credentials submitted successfully");
  }
}

async function userLogin(req, res) {
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;

  const userFound = await credentials.findOne({
    username: reqUsername,
  });

  if (
    userFound != null &&
    (await bcrypt.compare(reqPassword, userFound.password))
  ) {
    const token = jwt.sign(
      {
        username: reqUsername,
      },
      "key",
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.redirect("/select");
  } else {
    res.send("Invalid login credentials");
  }
}

function select(req, res) {
  const reqUsername = req.userData.username;
  res.render("select.ejs", { name: reqUsername });
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

function submit(req, res) {
  res.render("submitQuestions.ejs");
}

async function submitQuestions(req, res) {
  const reqExperience = req.body.experience;
  const reqRole = req.body.role;
  const reqQuestions = req.body.questions;

  await questions.create({
    experience: reqExperience,
    role: reqRole,
    questions: reqQuestions,
  });

  res.redirect("/select");
}

async function viewQuestions(req, res) {
  const reqExperience = req.body.experience;
  const reqRole = req.body.role;

  const questionsFound = await questions.find({
    experience: reqExperience,
    role: reqRole,
  });

  res.render("viewQuestions.ejs", { questionsFound });
}

function aboutus(req,res){
  res.render("aboutus.ejs")
}

function contact(req,res){
  res.render("contact.ejs");
}

module.exports = {
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
};
