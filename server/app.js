const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config");

/**
 * Multer init
 */
const upload = multer({
  dest: config.uploadFolder,
  limits: config.multerLimits,
  fileFilter: (req, file, cb) => {
    if (config.authorizedUploadTypes.includes(file.mimetype) === false) {
      return cb(new Error("File type not allowed: " + file.mimetype));
    }
    cb(null, true);
  }
});

/**
 * Express init
 */
const app = express();
app.use(cors(config.corsOptions));
app.use(compression());
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, config.uploadFolder)));
app.disable("x-powered-by");

/**
 * Helmet init
 */
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.noSniff());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  })
);

/**
 * Create database and start server
 */
const adapter = new FileAsync(config.database.name, {
  defaultValue: { files: [] }
});
low(adapter)
  .then(db => {
    /**
     * Retrieve all files already uploaded
     * @method GET
     * @returns list of file items (see json data file)
     * @example {Response}
     * [{
     *  data: {
     *    id: 24b5e7019e7d99c986d472c222392116,
     *    name: "react.jpg",
     *    mimeType: "image/jpeg"
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
     *    mimeType: "image/jpeg"
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
        .write()
        .then(post => {
          res.send(newFile);
        });
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

      db.get("files")
        .remove({ id: fileId })
        .write()
        .then(post => {
          // If file doesn't exist in DB, user try to delete a file from the server, or an non existing file
          if (post.length === 0) {
            const err = new Error();
            err.code = "ENOENT";
            return next(err);
          }

          const filePath = config.uploadFolder + fileId;
          fs.unlink(filePath, err => {
            if (err) {
              return next(err);
            }
            res.send(fileId);
          });
        });
    });

    /**
     * Error handler
     */
    app.use((err, req, res, next) => {
      console.error(err);
      if (res.headersSent) {
        return next(err);
      }

      // Handle Multer checks
      // see https://github.com/expressjs/multer/blob/eef091188d3f2c40d0da145d75114434b2b3f840/lib/make-error.js
      if (err.code && err.code.includes("LIMIT_")) {
        return res.status(422).send("A request param exceed server limit size");
      }

      // Handle "not found" on delete request
      if (err.code && err.code === "ENOENT") {
        return res.status(404).send("Can't find the ressource");
      }

      res.status(500).send("Something broke!");
    });
  })
  .then(() => {
    app.listen(config.port, () =>
      console.log("Server is listening on port " + config.port)
    );
  });
