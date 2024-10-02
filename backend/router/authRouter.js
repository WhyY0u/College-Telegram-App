const express = require('express');

const controller = require('../controller/authoController');
const validator = require('../validator/validator');

const router = express.Router();


router.post('/checkEmail', validator.checkemailValidators, controller.checkEmailHandler);
router.post('/checklogin', validator.checkloginValidators, controller.checkLoginHandler);
router.post('/register', validator.registrationValidators, controller.registerHandle);
router.post('/login', validator.loginValidators, controller.loginHandle);
router.post('/checktoken', controller.checktoken);

module.exports = router;