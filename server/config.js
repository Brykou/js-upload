module.exports = {
  port: 3001,
  uploadFolder: "uploads/",
  corsOptions: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"]
  },
  authorizedUploadTypes: ["image/jpeg", "image/png", "image/gif", "text/plain"]
};
