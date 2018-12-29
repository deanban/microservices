const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  res.render("fileMetadata.ejs");
});

router.post("/", upload.single("file"), (req, res) => {
  // console.log(req.file);
  const fileInfo = req.file;
  return res.json({
    name: fileInfo.originalname,
    type: fileInfo.mimetype,
    size: fileInfo.size
  });
});

module.exports = router;
