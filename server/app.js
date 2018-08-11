const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;
const uploadFolder = "uploads/";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"]
};

const authorizedUploadTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "text/plain"
];

const upload = multer({
  dest: uploadFolder,
  limits: {
    fieldNameSize: 100,
    fields: 10,
    fileSize: 125000, //1MB
    files: 1,
    parts: 10
  },
  fileFilter: (req, file, cb) => {
    if (authorizedUploadTypes.includes(file.mimetype) === false) {
      return cb(new Error("File type not allowed: " + file.mimetype), true);
    }
    cb(null, true);
  }
});

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.delete("/files/:id", (req, res, next) => {
  const fileId = req.params.id;
  const filePath = uploadFolder + fileId;
  fs.unlink(filePath, err => {
    if (err) {
      return next(err);
    }
    res.status(200).send("File " + fileId + " deleted");
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);

  if (err.code.includes("LIMIT_")) {
    return res.status(422).send("Something is oversized !");
  }

  if (err.code === "ENOENT") {
    return res.status(404).send("Can't find the ressource");
  }

  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log("Server is listening on port " + port));
