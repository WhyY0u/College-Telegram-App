const express = require('express');
const controller = require('../controller/imageController');

const router = express.Router();

router.get('/getTicket/:id', controller.getImageTicket);
router.get('/getNewsImg/:id', controller.getImageNews);
router.get('/getEvenImg/:id', controller.getImageEvent);

module.exports = router;