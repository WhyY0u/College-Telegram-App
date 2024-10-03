const express = require('express');

const controller = require('../controller/confidantController');
const validator = require('../validator/validator')

const router = express.Router();

router.get('/tickets', validator.ticketsValidator, controller.getTicketsHandle);
router.get('/ticket/:id', controller.getTicketByIDHandle);
router.put('/saveticket', validator.saveTicketValidator, controller.saveTicketHandle);
router.put('/saveNews', controller.saveNewsHandle);


module.exports = router;