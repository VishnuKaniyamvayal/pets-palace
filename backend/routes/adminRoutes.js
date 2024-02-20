const express = require('express')
const multer  = require("multer")
const router = express.Router()
const { Addpet } = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')
const { Addpet: AddpetWithUpload } = require('../controllers/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with current date-time
    const date = new Date().toISOString().replace(/\W/g, '_');
    const filename = `${date}.jpg`;
    cb(null, filename); // Use the original filename
  }
});

const upload = multer({ storage });


router.post('/addpet' , upload.single('image') , AddpetWithUpload)


module.exports = router