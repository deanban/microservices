module.exports = {
  setUserName: (userid, userName) => {
    User.findOne({ _id: userid }).then(user => {
      userName = user.name;
      console.log(userName);
    });
  },
  findAll: (userid, res, resultObj, userName) => {
    Exercise.find({ user: userid })
      .then(result => {
        console.log(result);
        // resultObj.username = userName;
        // resultObj.description = result.desc;
        // resultObj.duration = result.duration;
        // resultObj._id = result.user._id;
        // resultObj.date = moment(result.date).format("LL");

        /*for now: just display the result */
        res.json(result);
      })
      .catch(err => res.status(400).json(err));

    // setUserName(userid, userName);
  },
  findByDate: (userid, start, res) => {
    Exercise.find({ user: userid, date: start })
      .then(result => {
        // console.log(result);
        res.json(result);
      })
      .catch(err => res.status(400).json(err));
  },
  findBetweenDates: (userid, start, end, res) => {
    Exercise.find({ user: userid, date: { $gte: start, $lte: end } })
      .then(result => {
        res.json(result);
      })
      .catch(err => res.status(400).json(err));
  }
};
