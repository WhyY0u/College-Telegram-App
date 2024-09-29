const express = require('express');
const controller = require('../controller/imageController');

const router = express.Router();

router.get('/get/:id', controller.getImageTicket);

module.exports = router;