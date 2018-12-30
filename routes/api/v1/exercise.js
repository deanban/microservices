const moment = require("moment");
const express = require("express");
const router = express.Router();

const Exercise = require("../../models/Exercise");
const User = require("../../models/User");

router.get("/", (_, res) => {
  res.render("exerciseTracker.ejs");
});

// Add an Exercise
router.post("/add", (req, res) => {
  //   const errors = {};
  const exerciseConfig = {};
  //   console.log(req.body);
  const { userid, description, duration, date } = req.body;

  Exercise.findOne({ id: userid })
    .then(_ => {
      User.findOne({ _id: userid }).then(user => {
        if (user) {
          exerciseConfig.user = user;
          exerciseConfig.desc = description;
          exerciseConfig.duration = duration;
          exerciseConfig.date = date;

          new Exercise(exerciseConfig)
            .save()
            .then(result => {
              const resultObj = {
                username: result.user.name,
                description: result.desc,
                duration: result.duration,
                _id: result.user._id,
                date: moment(result.date).format("LL")
              };
              res.json(resultObj);
            })
            .catch(err => res.status(400).json(err));
        }
      });
    })
    .catch(err => res.status(400).json(err));
});

/*************************************************/
//Log Exercise by user or by user and date

router.get("/log", (req, res) => {
  const errors = {};

  const userid = Object.keys(req.query)[0];
  //   console.log(userid);

  const from = Object.keys(req.query)[1];
  const to = Object.keys(req.query)[2];
  console.log(from, to);

  let start = moment(from).toISOString();
  let end = moment(to).toISOString();
  //   console.log(start, end);

  const findAll = () => {
    Exercise.find({ user: userid })
      .then(result => {
        res.json(result);
      })
      .catch(err => res.status(400).json(err));
  };

  const findBetweenDates = () => {
    Exercise.find({ user: userid, date: { $gte: start, $lte: end } })
      .then(result => {
        res.json(result);
      })
      .catch(err => res.status(400).json(err));
  };

  const findByDate = () => {
    Exercise.find({ user: userid, date: start })
      .then(result => {
        // console.log(result);
        res.json(result);
      })
      .catch(err => res.status(400).json(err));
  };

  User.findOne({ _id: userid })
    .then(user => {
      if (user) {
        // console.log(user);
        if (from === undefined && to === undefined) {
          //   console.log("find all");
          findAll();
        } else if (from === undefined) {
          //   console.log("from undefined");
          errors.dateError = "You didn't provide a 'FROM' date";
          res.json(errors);
        } else if (to === undefined) {
          //   console.log("find by date");
          findByDate();
        } else {
          //   console.log("find between date");
          findBetweenDates();
        }
      } else {
        errors.notfound = "User not found";
        res.json(errors);
      }
    })
    .catch(err => res.status(400).json(err));
});
/*************************************************/

module.exports = router;
