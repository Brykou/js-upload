const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");

// Multer config
// Limit: Add constraints on user inputs
// fileFilter: Perform a check on mime type before uploading file on server
const upload = multer({
  dest: config.uploadFolder,
  limits: {
    fieldNameSize: 100,
    fields: 10,
    fileSize: 125000, //1MB
    files: 1,
    parts: 10
  },
  fileFilter: (req, file, cb) => {
    if (config.authorizedUploadTypes.includes(file.mimetype) === false) {
      return cb(new Error("File type not allowed: " + file.mimetype), true);
    }
    cb(null, true);
  }
});

const app = express();
app.use(cors(config.corsOptions));
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, config.uploadFolder)));

/**
 * Retrieve all files already uploaded
 * @method GET
 * @returns list of file names
 */
app.get("/files", (req, res) => {
  const fileList = [];
  fs.readdir(config.uploadFolder, (err, files) => {
    files.forEach(file => {
      fileList.push(file);
    });
    res.send(fileList);
  });
});

/**
 * Upload a new file
 * @method POST
 * @param fileToUpload data from input form
 * @returns id used to store file on the server, and original name
 */
app.post("/files", upload.single("fileToUpload"), (req, res) => {
  res.send({
    id: req.file.filename,
    name: req.file.originalname
  });
});

/**
 * Delete a specific file
 * @method DELETE
 * @param id file id return by POST /files endpoint
 */
app.delete("/files/:id", (req, res, next) => {
  const fileId = req.params.id;
  const filePath = config.uploadFolder + fileId;
  fs.unlink(filePath, err => {
    if (err) {
      return next(err);
    }
    res.send(fileId);
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);

  // Handle mutler checks
  // see https://github.com/expressjs/multer/blob/eef091188d3f2c40d0da145d75114434b2b3f840/lib/make-error.js
  if (err.code.includes("LIMIT_")) {
    return res.status(422).send("Something is oversized !");
  }

  // Handle "not found" on delete request
  if (err.code === "ENOENT") {
    return res.status(404).send("Can't find the ressource");
  }

  res.status(500).send("Something broke!");
});

app.listen(config.port, () =>
  console.log("Server is listening on port " + config.port)
);
