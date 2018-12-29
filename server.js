const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("***********DB Connected to mLab***********"))
  .catch(err => console.log(err));

const Timestamp = require("./routes/api/v1/timeStamp");

const Headerparser = require("./routes/api/v1/headerParser");

const Filemetadata = require("./routes/api/v1/fileMetadata");

const Urlshortener = require("./routes/api/v1/urlShortener");

app.use(express.static(__dirname + "/public"));

app.use("/api/v1/timestamp", Timestamp);
app.use("/api/v1/whoami", Headerparser);
app.use("/api/v1/upload", Filemetadata);
app.use("/api/v1/urlshortener", Urlshortener);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
