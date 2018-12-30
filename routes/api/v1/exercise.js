const moment = require("moment");
const express = require("express");
const router = express.Router();

const Exercise = require("../../models/Exercise");
const User = require("../../models/User");

const helpers = require("./helpers/exerciseTrackerHelpers");

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
// Track Exercise by user or by user and date

router.get("/log", (req, res) => {
  const errors = {};
  const resultObj = {};
  let userName;

  const userid = Object.keys(req.query)[1];
  // console.log(req.query);

  const from = Object.keys(req.query)[2];
  const to = Object.keys(req.query)[3];
  const limit = Object.keys(req.query)[0];
  // console.log(from, to);
  console.log("limit:", limit);

  let start = moment(from).toISOString();
  let end = moment(to).toISOString();
  //   console.log(start, end);

  User.findOne({ _id: userid })
    .then(user => {
      if (user) {
        // console.log(user);
        if (from === undefined && to === undefined && limit === undefined) {
          //   console.log("find all");
          helpers.findAll(userid, res, resultObj, userName);
        } else if (to === undefined) {
          //   console.log("find by date");
          helpers.findByDate(userid, start, res);
        } else if (limit === undefined) {
          //   console.log("find between date");
          helpers.findBetweenDates(userid, start, end, res);
        } else {
          helpers.findBetweenDatesWithLimit(userid, start, end, res, limit);
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
