const express = require('express');
const controller = require('../controller/imageController');

const router = express.Router();

router.get('/getTicket/:id', controller.getImageTicket);
router.get('/getNews/:id', controller.getImageNews);
router.get('/getEvent/:id', controller.getImageEvent);

module.exports = router;