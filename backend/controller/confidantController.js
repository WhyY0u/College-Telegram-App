const TicketUtils = require('../utils/ticketModelUtils');
const { Status } = require('../model/ticketModel');
const UserModelUtils = require('../utils/userModelUtils');
const jwtUtils = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');


const getTicketsHandle = async (req, res) => {
    const { page, limit } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const limitNumber = parseInt(limit, 10); 
    if (limitNumber <= 0) {
        return res.status(200).json({ tickets: [], totalPages: 0, currentPage: page });
    }

    try {
        const tickets = await TicketUtils.getTickets(page, limitNumber);
        const infoTicket = {_id: tickets._id, heading: tickets.heading, status: tickets.status, type: tickets.type, description: tickets.description}
        const totalTickets = await TicketUtils.countTickets(); 
        res.status(200).json({
            tickets,
            totalPages: Math.ceil(totalTickets / limitNumber),
            currentPage: page
        });
    } catch (error) {
      console.log(error);
        res.status(500).send("Ошибка при получении тикетов");
    }
};
const getTicketByIDHandle = async (req, res) => {
    const ticketId = req.params.id;

    const ticket = await TicketUtils.findTicketByID(ticketId);
    if(!ticket) {
        return res.status(400).send("Тикет не найден");
    }
    const user = await UserModelUtils.findByID(ticket.creatorid);

    const ticketReq = {
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        heading: ticket.heading,
        type: ticket.type,
        status: ticket.status,
        description: ticket.description,
    };
    if(ticket.image != null) {
        ticketReq.image = ticket.image;
    }
    if (ticket.comment != null) {
        const moderator = await UserModelUtils.findByID(ticket.moderator_id);
        Object.assign(ticketReq, {
            comment: ticket.comment,
            moderator_name: moderator.name,
            moderator_surname: moderator.surname,
            moderator_patronymic: moderator.patronymic,
        });
    }

    return res.status(200).send(ticketReq);
};
 const saveTicketHandle = async (req, res) => {
    const { id, comment, status } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const ticket = await TicketUtils.findTicketByID(id);
    const user = await jwtUtils.getUserByReq(req);
    const updates = {moderator_id: user._id};
    if(comment != null) {
      updates.comment = comment;
      if (comment.length < 20 && comment.length > 2000) return res.status(400).send("Комментарий должен быть в переделе 20 - 2000");
    } 
    if(status != null) {
      updates.status = status;
      if (!Object.values(Status).includes(status)) return res.status(400).send("Неизвестный Статус");
    }
    
   if (Object.keys(updates).length > 0) {
      await TicketUtils.updateTicketById(ticket._id, updates);
   }
    
    
   res.status(200).send("Тикет обновлен!");
   
   
};

module.exports = {saveTicketHandle, getTicketByIDHandle, getTicketsHandle};