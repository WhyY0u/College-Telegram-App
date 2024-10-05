const express = require('express');

const controller = require('../controller/confidantController');
const validator = require('../validator/validator')
const multer = require('multer');

const router = express.Router();

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } 
  });

router.get('/tickets', validator.ticketsValidator, controller.getTicketsHandle);
router.get('/ticket/:id', controller.getTicketByIDHandle);
router.put('/saveticket', validator.saveTicketValidator, controller.saveTicketHandle);
router.put('/saveNews', upload.array('images', 10), validator.createNewsValidator, controller.saveNewsHandle);
router.put('/saveEvent', upload.array('images', 10), validator.createEventValidator, controller.saveEventHandle);


module.exports = router;