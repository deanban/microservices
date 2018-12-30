const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get("/", (_, res) => {
  res.render("users.ejs");
});

router.post("/register", (req, res) => {
  const errors = {};
  const userConfig = {};
  console.log(req.body);
  const { name } = req.body;

  User.findOne({ name: name })
    .then(user => {
      if (user) {
        errors.name = "username already exits";
        return res.status(400).json(errors);
      } else {
        userConfig.name = name;

        new User(userConfig)
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => res.status(400).json(err));
      }
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
