const express = require("express");

const app = express();

const Timestamp = require("./routes/api/v1/timeStamp");

app.use("/api/v1/timestamp", Timestamp);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
