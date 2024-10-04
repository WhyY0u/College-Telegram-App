const express = require('express');

const controller = require('../controller/newsController');
const validator = require('../validator/validator');

const router = express.Router();


router.get('/get', controller.getNewsHandle);

module.exports = router;