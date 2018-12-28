const express = require("express");

const app = express();

const Timestamp = require("./routes/api/v1/timeStamp");

const Headerparser = require("./routes/api/v1/headerParser");

const Filemetadata = require("./routes/api/v1/fileMetadata");

app.use(express.static(__dirname + "/public"));

app.use("/api/v1/timestamp", Timestamp);
app.use("/api/v1/whoami", Headerparser);
app.use("/api/v1/upload", Filemetadata);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
