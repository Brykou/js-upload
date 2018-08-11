const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

const port = 3001;
const uploadFolder = "uploads/";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "POST", "DELETE"]
};

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});
const upload = multer({
  storage: storage
});

const app = express();
app.use(cors(corsOptions));

app.get("/files", (req, res) => {
  const fileList = [];
  fs.readdir(uploadFolder, (err, files) => {
    files.forEach(file => {
      fileList.push(file);
    });
    res.send(fileList);
  });
});

app.post("/files", upload.single("fileToUpload"), (req, res) => {
  res.send({
    id: req.file.filename,
    name: req.file.originalname
  });
});

app.listen(port, () => console.log("Server is listening on port " + port));
