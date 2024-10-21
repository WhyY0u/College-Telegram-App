require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./model/userModel');
const botUtils = require('./utils/botUtils');

const cors = require('cors');


const middleware = require('./middleware/middleware');
const authoRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const confidantRouter = require('./router/confidantRouter');
const imageRouter = require('./router/imageRouter');
const newsRouter = require('./router/newsRouter');
const profileRouter = require('./router/profileRouter')

const PORT = process.env.PORT || 3000;

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bym8p.mongodb.net/kit?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURI).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));


const app = express();

const corsOptions = {
  origin: '*',
  methods: '*',  
  allowedHeaders: ['Content-Type', 'Authorization']  
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authoRouter);
app.use('/api/user', middleware.RoleAndAuthoMiddleware(User.Role.Student), userRouter);
app.use('/api/confidant', middleware.RoleAndAuthoMiddleware(User.Role.Confidant), confidantRouter);
app.use('/api/image', middleware.authMiddleware, imageRouter);
app.use('/api/news', middleware.authMiddleware, newsRouter);
app.use('/api/profile', middleware.authMiddleware, profileRouter);


botUtils.bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const miniAppUrl = 'https://telegram-app.pbk.kz/';
  await botUtils.bot.sendMessage(chatId, 'Добро пожаловать в KitAitu! Мы готовы выслушать вас!', {
    reply_markup: {
       inline_keyboard: [
       [{text: 'Открыть KitAitu', web_app: {url: miniAppUrl}}]
       ]
    }
  })

});
botUtils.bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  await botUtils.saveChatID(chatId);

});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});