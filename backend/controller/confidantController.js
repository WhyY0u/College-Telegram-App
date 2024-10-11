const TicketUtils = require('../utils/ticketModelUtils');
const { Status } = require('../model/ticketModel');
const UserModelUtils = require('../utils/userModelUtils');
const jwtUtils = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');
const file = require('../utils/fileUtils');
const { News } = require('../model/newsModel');
const { Event } = require('../model/eventModel');
const DateUtils = require('../utils/dateUtils')

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
    if(!user) {
        return res.status(400).send("Ошибка пользвателя");
    }

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


const saveEventHandle = async (req, res) => {
    const { heading, description, start, place} = req.body;
    const files = req.files; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
    const dat = DateUtils.getCurrentDateInPavlodar();
    const newEvent = new Event({ date: new Date(dat), heading, description, start, place, likes: [] });
    try {
      
   
        if (files && files.length > 0) {
            const imgs = await file.saveImages(files, "imgEvent"); 
            newEvent.images = imgs;
        }
    } catch {
        if (err instanceof multer.MulterError) {
            return res.status(400).send("Файл слишком большой.");
          } else {
            return res.status(500).send("Ошибка загрузки файла.");
          }
    }
    await newEvent.save();
    return res.status(200).send("Успешно.");
    }catch(error) {
        console.error(error)
    return res.status(500).send("Ошибка создание Мероприятие.");
    }
    
}

  
  const saveNewsHandle = async (req, res) => {
    const { heading, description } = req.body; 
    console.log(req.query);
    const files = req.files; 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const dat = DateUtils.getCurrentDateInPavlodar();
        const newNews = new News({ date: new Date(dat), heading, description, likes: [] });

        if (files && files.length > 0) {
            const imgs = await file.saveImages(files, "imgNews"); 
            newNews.images = imgs;
        }

        await newNews.save(); 
        return res.status(200).send("Успешно.");
    } catch (err) { 
        console.error(err); 
        return res.status(500).send("Ошибка при создании новости.");
    }
};




module.exports = {saveTicketHandle, getTicketByIDHandle, getTicketsHandle, saveNewsHandle, saveEventHandle};