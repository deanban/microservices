const express = require("express");
const router = express.Router();

const UrlShortener = require("../../models/UrlShortener");

const urlValidator = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
const shortUrlValidator = new RegExp("^(http|https)://", "i");

const shortenURL = (urlstr, res) => {
  const errors = {};
  const config = {};
  let shortened;

  if (urlValidator.test(urlstr) === true) {
    shortened = Math.floor(Math.random() * 100000).toString();

    UrlShortener.findOne({ url: urlstr })
      .then(result => {
        if (result) {
          res.json({ url: result.url, shortURL: result.shortURL });
        } else {
          config.url = urlstr;
          config.shortURL = shortened;

          new UrlShortener(config)
            .save()
            .then(result =>
              res.json({ url: result.url, shortURL: result.shortURL })
            )
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  } else {
    errors.urlError = "Invalid url";
    res.status(404).json(errors);
  }
};

const shortURLFindAndRedirect = (shortUrl, res) => {
  const errors = {};

  UrlShortener.findOne({ shortURL: shortUrl })
    .then(result => {
      // console.log(result);
      if (result) {
        // console.log(result);
        if (shortUrlValidator.test(result.url) === true) {
          // errors.noerror = "Success";
          res.redirect(301, result.url);
        }
      } else {
        errors.notfound = "Short URL not found in database.";
        res.status(404).json(errors);
      }
    })
    .catch(err => res.status(400).json(err));
};

router.get("/", (req, res) => {
  res.render("urlshortener.ejs");
});

router.post("/new/:urlstr(*)", (req, res) => {
  if (req.body.urlstr) {
    // console.log("body", req.body);
    const { urlstr } = req.body;
    shortenURL(urlstr, res);
  } else {
    // console.log("params", req.params);
    const { urlstr } = req.params;
    shortenURL(urlstr, res);
  }
});

router.get("/short/:shortUrl(*)", (req, res) => {
  if (req.body.urlstr) {
    // console.log("body", req.body);
    const { shortUrl } = req.body;
    shortURLFindAndRedirect(shortUrl, res);
  } else {
    // console.log("params", req.params);
    const { shortUrl } = req.params;
    shortURLFindAndRedirect(shortUrl, res);
  }
});

module.exports = router;
