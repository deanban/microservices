const express = require("express");
// const moment = require("moment");

const ip = require("ip");

const router = express.Router();
// var networkInterfaces = os.networkInterfaces();

router.get("/", (req, res) => {
  res.json({
    ipaddress: ip.address(),
    language: req.acceptsLanguages()[0],
    software: req.get("User-Agent")
  });
});

module.exports = router;
