const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/assets/machinery"); // Define the destination folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Define the file name
  },
});

// Initialize multer upload
const upload = multer({
  storage: storage,
}).single("image"); // 'image' is the field name in your form

// Middleware to handle file upload
const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file" });
    }
    next(); // Proceed to the next middleware
  });
};

module.exports = uploadImage;
