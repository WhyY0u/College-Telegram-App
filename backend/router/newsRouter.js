const express = require('express');

const controller = require('../controller/newsController');
const validator = require('../validator/validator');

const router = express.Router();


router.post('/get', validator.newsValidator, controller.getNewsHandle);

module.exports = router;