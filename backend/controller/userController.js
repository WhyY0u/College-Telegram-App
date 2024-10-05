const Ticket = require('../model/ticketModel');
const Jwt = require('../utils/jwtUtils')
const file = require('../utils/fileUtils')
const UserModelUtils = require('../utils/userModelUtils');

const TicketUtils = require('../utils/ticketModelUtils')
const multer = require('multer');
const { validationResult } = require('express-validator');


const createTicketHandle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { heading, type, description } = req.body;
    if (!Object.values(Ticket.Type).includes(type)) {
      return res.status(400).send("Данный тип не существует");
    }
  
    const user = await Jwt.getUserByReq(req);
    const newTicket = new Ticket.Ticket({ creatorid: user._id, heading, status: Ticket.Status.Sent, type, description });
  
    if (req.file) {
      try {
        const name = await file.saveImage(req, "imgTicket");
        newTicket.image = name;
      } catch (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send("Файл слишком большой.");
        } else {
          console.log(err);
          return res.status(500).send("Ошибка загрузки файла.");
        }
      }
    }
  
    try {
      await newTicket.save();
      res.status(200).send("Ticket успешно создан");
    } catch {
      res.status(500).send("Ошибка при создании тикета");
    }
  };
  
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

    const user = await Jwt.getUserByReq(req);
    try {
        const tickets = await TicketUtils.getTicketsByCreatorId(user._id, page, limitNumber);
        const totalTickets = await TicketUtils.countTicketsByCreatorId(user._id); 
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
  const its = await Jwt.getUserByReq(req);
  if(!ticket.creatorid.equals(its._id)) {
    return res.status(400).send("Ошибка доступа");
  }
  const user = await UserModelUtils.findByID(ticket.creatorid);

  const ticketReq = {
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


module.exports = {createTicketHandle, getTicketsHandle, getTicketByIDHandle};