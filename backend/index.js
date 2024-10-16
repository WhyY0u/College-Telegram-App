require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const BotUtils = require('./utils/botUtils')
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./model/userModel');

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

//  const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo:27017/${process.env.DB_NAME}?authSource=admin`;
//  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err)); 

// const dbURI = `mongodb://localhost:27017/kit`;
//  mongoose.connect(dbURI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

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


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});