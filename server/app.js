const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var helmet = require("helmet");
const config = require("./config");

// Multer init
const upload = multer({
  dest: config.uploadFolder,
  limits: config.multerLimits,
  fileFilter: (req, file, cb) => {
    if (config.authorizedUploadTypes.includes(file.mimetype) === false) {
      return cb(new Error("File type not allowed: " + file.mimetype), true);
    }
    cb(null, true);
  }
});

// Low DB init
const db = low(new FileSync(config.uploadFolder + config.database.name));
db.defaults({ files: [] }).write();

// Express init
const app = express();
app.use(cors(config.corsOptions));
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, config.uploadFolder)));
app.use(helmet());
app.disable("x-powered-by");
app.use(helmet.xssFilter());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  })
);

/**
 * Retrieve all files already uploaded
 * @method GET
 * @returns list of file items (see json data file)
 * @example {Response}
 * [{
 *  data: {
 *    id: 24b5e7019e7d99c986d472c222392116,
 *    name: "react.jpg",
 *    mimeType: "image.jpeg"
 *  }
 * }]
 */
app.get("/files", (req, res) => {
  const fileList = db.get("files").value();
  res.send(fileList);
});

/**
 * Upload a new file
 * @method POST
 * @param fileToUpload data from input form
 * @returns file item (see json data file)
 * @example {Response}
 * {
 *  data: {
 *    id: 24b5e7019e7d99c986d472c222392116,
 *    name: "react.jpg",
 *    mimeType: "image.jpeg"
 *  }
 * }
 */
app.post("/files", upload.single("fileToUpload"), (req, res) => {
  const newFile = {
    id: req.file.filename,
    name: req.file.originalname,
    mimeType: req.file.mimetype
  };
  db.get("files")
    .push(newFile)
    .write();
  res.send(newFile);
});

/**
 * Delete a specific file
 * @method DELETE
 * @param id file id return by POST /files endpoint
 * @returns file id
 * @example {Response}
 * {
 *  data: {
 *    id: 24b5e7019e7d99c986d472c222392116
 *  }
 * }
 */
app.delete("/files/:id", (req, res, next) => {
  const fileId = req.params.id;
  const filePath = config.uploadFolder + fileId;
  fs.unlink(filePath, err => {
    if (err) {
      return next(err);
    }
    db.get("files")
      .remove({ id: fileId })
      .write();
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

  // Handle Multer checks
  // see https://github.com/expressjs/multer/blob/eef091188d3f2c40d0da145d75114434b2b3f840/lib/make-error.js
  if (err.code && err.code.includes("LIMIT_")) {
    return res.status(422).send("Something is oversized !");
  }

  // Handle "not found" on delete request
  if (err.code && err.code === "ENOENT") {
    return res.status(404).send("Can't find the ressource");
  }

  res.status(500).send("Something broke!");
});

app.listen(config.port, () =>
  console.log("Server is listening on port " + config.port)
);
