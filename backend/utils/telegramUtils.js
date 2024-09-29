const axios = require("axios");

const { TOKEN } = process.env;
const URI = `/webhook/${TOKEN}`;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;


async function sendMessage(chatId, text) {
await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text,
});
}

module.exports = {sendMessage, URI};