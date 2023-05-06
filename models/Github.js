const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const githubSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  }
});

const Github = mongoose.model("github_user", githubSchema);
module.exports = Github;
