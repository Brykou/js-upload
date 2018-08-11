const express = require("express");
const fs = require("fs");
const cors = require("cors");

const port = 3001;
const uploadFolder = "uploads/";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "POST", "DELETE"]
};

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

app.listen(port, () => console.log("Server is listening on port " + port));
