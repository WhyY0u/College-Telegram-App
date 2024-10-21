const Chat = require('../model/chatModel')
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const Event = require('../model/eventModel')
const findChatByID = async (id) => {
    const channel = await Chat.Chat.findOne({
        $or: [{ chatId: id }]
      });
      return channel;
}

const saveChatID = async (id) => {
  const chat = await findChatByID(id);
  if(chat == null) {
   const newChat = new Chat.Chat({ chatId: id});
   await newChat.save();
  }
}

setInterval(async () => {
  const now = new Date();
  const fiveHoursLater = new Date(now.getTime() + 5 * 60 * 60 * 1000);

  const events = await Event.Event.find({
    send: false,
    start: { $lt: new Date(fiveHoursLater.getTime() + 5 * 60 * 1000), $gt: fiveHoursLater }
  });

  if (events.length > 0) {
    const sendChat = events.map(async event => {
      try {
        await sendAllMessage(
          `✨ *Мероприятие*: ${event.heading}` +
          `\n⏳ *Начнется через*: 5 минут` +
          `\n📍 *Место*: '${event.place}'`
        );
        await Event.Event.findByIdAndUpdate(event._id, { send: true }, { new: true });
      } catch (error) {
        console.error(`Ошибка при обработке события ${event._id}:`, error);
      }
    });

    await Promise.all(sendChat);
  }

}, 60 * 1000);


const sendAllMessage = async (message) => {
  const chats = await Chat.Chat.find({});
  const sendMessagesPromises = chats.map(chat => 
    bot.sendMessage(chat.chatId, message, { parse_mode: 'Markdown' }) 
  );
  await Promise.all(sendMessagesPromises);
}



module.exports = {sendAllMessage, saveChatID, bot}