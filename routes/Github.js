const router = require("express").Router();
let Github = require("../models/Github");

router.route("/").get(async (req, res) => {
  const quaries = req.query;
  const user = await Github.findOne({ userName: quaries["username"] });

  if (user === null) {
    const newUser = new Github({
      userName: quaries["username"],
      views: 1,
    });
    newUser
      .save()
      .then(() => {
        res.send(
          `<img src = "https://img.shields.io/badge/Profile%20views-1-blue?style=flat" alt = "Profile views" />`
        );
      })
      .catch(() => {
        res.send(
          `<img src = "https://img.shields.io/badge/Profile%20views-Error-blue?style=flat" alt = "Profile views" />`
        );
      });
  } else {
    res.send(
      `<img src = "https://img.shields.io/badge/Profile%20views-${user["views"] + 1}-blue?style=flat" alt = "Profile views" />`
    );
    await Github.findOneAndUpdate({ userName: quaries["username"]} , {views : ++user["views"]})
  }


});

module.exports = router;
