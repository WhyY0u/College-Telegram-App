const express = require('express');

const controller = require('../controller/profileController');

const router = express.Router();


router.get('/get/:id', controller.getProfile);

module.exports = router;