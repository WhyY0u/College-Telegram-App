require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cookieParser = require('cookie-parser')

const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require("body-parser");
const token = '7782432618:AAG0ZxOTDs93F7tM-DNHfVpUp1JFISAs8Sk'
const bot = new TelegramBot(token, {polling: true});
// const web_app_url = 'https://tg-web-app-react-jade.vercel.app/'
const { TOKEN, TELEGRAM_WEBHOOK_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = TELEGRAM_WEBHOOK_URL + URI;
const path = require('path')
const authRoutes = require('./routes/auth.routes')

const {connectToMongoDB} = require("./db/connectToMongoDb");
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
};

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text
//
//   if(text === '/start'){
//     await bot.sendMessage(chatId,'Ниже появится кнопка заполните форму',{
//       reply_markup:{
//         keyboard:[
//           [{text:'Салам заполни форму братишка',web_app:{url:web_app_url + '/form'}}]
//         ],
//       }
//     })
//     await bot.sendMessage(chatId,'Заходи в наш интернет магазин по кнопке ниже',{
//       reply_markup:{
//         inline_keyboard:[
//           [{text:'Сделать заказ',web_app:{url:web_app_url}}]
//         ],
//       }
//     })
//   }
// });

app.post(URI, async (req, res) => {
  const chatId = req.body.message?.chat.id;
  const text = req.body.message?.text;
  res.status(200).send("ok");

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
  return res.send();
});

app.listen(process.env.PORT || 5000, async () => {
  connectToMongoDB()
  console.log("🚀 app running on port", process.env.PORT || 5000);
  await init();
});
