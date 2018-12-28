const express = require("express");

const app = express();

const Timestamp = require("./routes/api/v1/timeStamp");

const Headerparser = require("./routes/api/v1/headerParser");

app.use("/api/v1/timestamp", Timestamp);
app.use("/api/v1/whoami", Headerparser);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
