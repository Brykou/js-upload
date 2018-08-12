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
  // Used by fileFilter to perform a check on mime type before uploading file on server
  authorizedUploadTypes: ["image/jpeg", "image/png", "image/gif", "text/plain"],
  // Multer limits add constraints on user inputs
  multerLimits: {
    fieldNameSize: 100,
    fields: 10,
    fileSize: 1000000, //1MB
    files: 1,
    parts: 10
  }
};
