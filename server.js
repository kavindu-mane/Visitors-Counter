const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const githubRouter = require("./routes/Github");
const app = express();
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

app.use("/github", githubRouter);
// give message about backend working status
app.get("/", async (req, res) => {
  const url =
    "https://img.shields.io/badge/System%20status-Working-success?style=for-the-badge";
  sendingSvg(url, res);
});

// give error search term not found
app.get("/:anything", async (req, res) => {
  const search = req.params.anything;
  const url = `https://img.shields.io/badge/Error-${search}%20not%20fount-red?style=for-the-badge`;
  sendingSvg(url, res);
});

async function sendingSvg(url, res) {
  let response = await axios.get(url);
  const svgXml = response.data;
  res.set("Content-Type", "img/svg+xml");
  res.send(svgXml);
}
