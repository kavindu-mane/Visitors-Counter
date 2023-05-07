const router = require("express").Router();
let Github = require("../models/Github");
const axios = require("axios");

router.route("/").get(async (req, res) => {
  const quaries = req.query;
  const username = quaries["username"];
  const style = quaries["style"] === undefined ? "flat" : quaries["style"];
  const color = quaries["color"] === undefined ? "blue" : quaries["color"];

  const user = await Github.findOne({ userName: username });

  if (user === null) {
    const newUser = new Github({
      userName: username,
      views: 1,
    });
    newUser
      .save()
      .then(() => {
        const url = `https://img.shields.io/badge/Profile%20views-1-${color}?style=${style}`;
        sendingSvg(url, res);
      })
      .catch(() => {
        const url = `https://img.shields.io/badge/Profile%20views-Error-${color}?style=${style}`;
        sendingSvg(url, res);
      });
  } else {
    const url = `https://img.shields.io/badge/Profile%20views-${user[
      "views"
    ] + 1}-${color}?style=${style}`;
    sendingSvg(url, res);

    await Github.findOneAndUpdate(
      { userName: username },
      { views: ++user["views"] }
    );
  }
});

async function sendingSvg(url, res) {
  let response = await axios.get(url);
  const svgXml = response.data;
  res.send(svgXml);
}

module.exports = router;
