module.exports = {
  port: 3001,
  uploadFolder: "uploads/",
  database: {
    name: "upload.json"
  },
  corsOptions: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"]
  },
  authorizedUploadTypes: ["image/jpeg", "image/png", "image/gif", "text/plain"],
  multerLimits: {
    fieldNameSize: 100,
    fields: 10,
    fileSize: 125000, //1MB
    files: 1,
    parts: 10
  }
};
