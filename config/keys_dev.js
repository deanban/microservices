const Mlab = require("./mlab");
module.exports = {
  mongoURI: `mongodb://${Mlab.name}:${
    Mlab.password
  }@ds245234.mlab.com:45234/url-shortener-microservice`,
  secretKey: "secret"
};
