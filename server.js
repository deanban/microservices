const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//DB config
const db = require("./config/keys").mongoURI;

console.log("node_env:", process.env.NODE_ENV);
//connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("***********DB Connected to mLab***********"))
  .catch(err => console.log(err));
console.log("mongo uri:", process.env.MONGO_URI);

const index = require("./routes/api/v1/index");

const Timestamp = require("./routes/api/v1/timeStamp");

const Headerparser = require("./routes/api/v1/headerParser");

const Filemetadata = require("./routes/api/v1/fileMetadata");

const Urlshortener = require("./routes/api/v1/urlShortener");

const Users = require("./routes/api/v1/users");

const ExerciseTracker = require("./routes/api/v1/exercise");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/api/v1/timestamp", Timestamp);
app.use("/api/v1/whoami", Headerparser);
app.use("/api/v1/upload", Filemetadata);
app.use("/api/v1/urlshortener", Urlshortener);
app.use("/api/v1/users", Users);
app.use("/api/v1/exercise", ExerciseTracker);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
