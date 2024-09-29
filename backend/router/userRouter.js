const express = require('express');

const multer = require('multer');
const router = express.Router();
const controller = require('../controller/userController');
const validator  = require('../validator/validator');

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post('/createticket',  upload.single('image'), validator.createTicketValidator, controller.createTicketHandle);
router.get('/tickets', validator.ticketsValidator, controller.getTicketsHandle);
router.get('/ticket/:id', controller.getTicketByIDHandle);

module.exports = router;