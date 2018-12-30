const express = require("express");
const moment = require("moment");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    unix: moment().unix(),
    utc: moment()
      .utc()
      .format("LLLL")
  });
});

router.get("/:dateStr", (req, res) => {
  const providedTime = req.params.dateStr;

  const utcDate = moment(providedTime)
    .utc()
    .format("LLLL");
  const unixDate = moment(providedTime).unix();

  if (moment(providedTime).isValid()) {
    res.json({
      unix: unixDate,
      utc: utcDate
    });
  } else if (Number(providedTime)) {
    res.json({
      unix: providedTime,
      utc: moment
        .unix(providedTime)
        .utc()
        .format("LLLL")
    });
  } else {
    res.json({ error: "Invalid Time" });
  }
});

module.exports = router;
