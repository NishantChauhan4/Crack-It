const mongoose = require("mongoose");

const credentialsSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const credentials = mongoose.model("credentials", credentialsSchema);

const questionsSchema = new mongoose.Schema({
  experience: String,
  role: String,
  questions: String,
});

const questions = mongoose.model("questions", questionsSchema);

module.exports = { credentials, questions };
