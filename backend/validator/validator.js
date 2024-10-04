const { body, validationResult } = require('express-validator');


const registrationValidators = [
    body('login')
      .notEmpty().withMessage('Login не должен быть пустым.')
      .isLength({ max: 30, min: 3 }).withMessage('Login должен быть от 3 до 30 символов.'),
      
    body('email')
      .notEmpty().withMessage('Email не должен быть пустым.')
      .isEmail().withMessage('Email должен быть корректным.')
      .isLength({ max: 200 }).withMessage('Email должен быть не длиннее 200 символов.'),
      
    body('name')
      .notEmpty().withMessage('Имя не должно быть пустым.')
      .isLength({ max: 50, min: 3 }).withMessage('Имя должно быть от 3 до 50 символов.'),
      
    body('surname')
      .notEmpty().withMessage('Фамилия не должна быть пустой.')
      .isLength({ max: 50, min: 3 }).withMessage('Фамилия должна быть от 3 до 50 символов.'),
    
    body('patronymic')
      .notEmpty().withMessage('Отчество не должна быть пустой.')
      .isLength({ max: 50, min: 3 }).withMessage('Отчество должна быть от 3 до 50 символов.'),
      
    body('password')
      .notEmpty().withMessage('Пароль не должен быть пустым.')
      .isLength({ max: 30, min: 8 }).withMessage('Пароль должен быть от 8 до 30 символов.')
  ];

const checkemailValidators = [
    body('email')
    .notEmpty().withMessage('Email не должен быть пустым.')
    .isEmail().withMessage('Email должен быть корректным.')
    .isLength({ max: 200 }).withMessage('Email должен быть не длиннее 200 символов.'),
  ];

const checkloginValidators =  [
     body('login')
    .notEmpty().withMessage('Login не должен быть пустым.')
    .isLength({ max: 30, min: 3 }).withMessage('Login должен быть от 3 до 30 символов.'),
  ];

const loginValidators =  [
    body('login')
    .notEmpty().withMessage('Login не должен быть пустым.')
    .isLength({ max: 30, min: 3 }).withMessage('Login должен быть от 3 до 30 символов.'),

    body('password')
    .notEmpty().withMessage('Пароль не должен быть пустым.')
    .isLength({ max: 30, min: 8 }).withMessage('Пароль должен быть от 8 до 30 символов.')
  ];

const ticketsValidator = [
    body('page').optional().isNumeric().withMessage('page должен быть числом').notEmpty().withMessage("page не должна быть пустой."),
    body('limit').optional().isNumeric().withMessage('limit должен быть числом').notEmpty().withMessage("limit не должна быть пустой."),
];
const saveTicketValidator = 
[
    body('id').notEmpty().withMessage('id не должен быть пустым.'),
    body('comment').optional().isLength({min: 15, max: 2000}).withMessage("Диапозон comment должен быть в приделе от 15 до 2000 символов"),

];

const createTicketValidator = [
    body('heading')
    .notEmpty().withMessage('Heading не должен быть пустым.')
    .isLength({ min: 5, max: 13 }).withMessage('Heading должен быть от 5 до 13 символов.'),
    
     body('type')
    .notEmpty().withMessage('Type не должен быть пустым.'),
    
     body('description')
    .notEmpty().withMessage('Description не должна быть пустой.')
    .isLength({ min: 50, max: 2000 }).withMessage('Description должна быть от 50 до 2000 символов.')
];

const createNewsValidator = [
  body('heading')
  .notEmpty().withMessage('Heading не должен быть пустым.')
  .isLength({ min: 5, max: 13 }).withMessage('Heading должен быть от 5 до 13 символов.'),
  
   body('description')
  .notEmpty().withMessage('Description не должна быть пустой.')
  .isLength({ min: 50, max: 2000 }).withMessage('Description должна быть от 50 до 2000 символов.')
];

const createEventValidator = [
  body('heading')
    .notEmpty().withMessage('Heading не должен быть пустым.')
    .isLength({ min: 5, max: 13 }).withMessage('Heading должен быть от 5 до 13 символов.'),

  body('description')
    .notEmpty().withMessage('Description не должна быть пустой.')
    .isLength({ min: 50, max: 2000 }).withMessage('Description должна быть от 50 до 2000 символов.'),

  body('place')
    .notEmpty().withMessage('place не должен быть пустым.')
    .isLength({ min: 1, max: 30 }).withMessage('place должен быть от 1 до 30 символов.'),

  body('start')
    .notEmpty().withMessage('Start не должна быть пустой.')
    .isISO8601().withMessage('Start должна быть валидной датой в формате ISO8601.')
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      
      inputDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      if (inputDate < currentDate) {
        throw new Error('Start не должна быть меньше текущей даты.');
      }
      return true;
    })
];

  module.exports = {registrationValidators, checkemailValidators, checkloginValidators, loginValidators, ticketsValidator, saveTicketValidator, createTicketValidator, createNewsValidator, createEventValidator}