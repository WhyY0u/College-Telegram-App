const express = require('express');

const controller = require('../controller/profileController');

const router = express.Router();
const multer = require('multer');

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } 
  });

router.get('/get', controller.getProfile);
router.patch('/update', upload.single('image'), controller.updProfile);


module.exports = router;