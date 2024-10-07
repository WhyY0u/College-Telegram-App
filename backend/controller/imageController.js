const express = require('express');
const TicketUtils = require('../utils/ticketModelUtils');
const NewsUtils = require('../utils/newsUtils');

const Jwt = require('../utils/jwtUtils');
const User = require('../model/userModel');
const router = express.Router();
const path = require('path');
const { validationResult } = require('express-validator');

const getImageTicket = async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await TicketUtils.findTicketByID(ticketId);
    if(!ticket) {
         return res.status(400).send("Тикет не найден");
    }
    if(ticket.image == null) {
        return res.status(400).send("Картинка не найдена")
    }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
     }
    const user = await Jwt.getUserByReq(req);
    if(!Object.values(User.Role).includes(user.role)) {
        return res.status(400).send("Ошибка при проверке роли");
    }
    if(user.role == User.Role.Student) {
        if(!user._id.equals(ticket.creatorid)) {
            return res.status(400).send("Доступ запрещен");
        }
    }
  const filePath = path.join(__dirname, '../img/imgTicket', ticket.image);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
        res.status(err.status).end();
    } else {
    }
});
  } catch(error) {
    console.log(error);
    res.status(500).send("Ошибка при получение картинки");
  }
};

const getImageNews = async (req,res) => {
   const imageNewsId = req.params.id;
   const filePath = path.join(__dirname, '../img/imgTicket', imageNewsId);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      res.status(err.status).end();
    } else {
    }
});
}

const getImageEvent = async (req,res) => {
  const imageEventId = req.params.id;
  const filePath = path.join(__dirname, '../img/imgEvent', imageEventId);
  res.status(200).sendFile(filePath, (err) => {
   if (err) {
     res.status(err.status).end();
   } else {
   }
});
}


module.exports = {getImageTicket, getImageNews, getImageEvent};