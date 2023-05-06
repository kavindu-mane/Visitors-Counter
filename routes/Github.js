const router = require("express").Router();
let Github = require("../models/Github");

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
        res.send(
          `<img src = "https://img.shields.io/badge/Profile%20views-1-${color}?style=${style}" alt = "Profile views" />`
        );
      })
      .catch(() => {
        res.send(
          `<img src = "https://img.shields.io/badge/Profile%20views-Error-${color}?style=${style}" alt = "Profile views" />`
        );
      });
  } else {
    res.send(
      `<img src = "https://img.shields.io/badge/Profile%20views-${
        user["views"] + 1
      }-${color}?style=${style}" alt = "Profile views" />`
    );
    await Github.findOneAndUpdate(
      { userName: username },
      { views: ++user["views"] }
    );
  }
});

module.exports = router;
