const Chat = require('../model/chatModel')

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

const sendMessage = (message) => {
    
}


module.exports = {sendMessage, saveChatID}