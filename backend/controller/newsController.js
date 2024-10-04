const User = require('../model/userModel');
const jwtUtils = require('../utils/jwtUtils')
const newUtils = require('../utils/newsUtils')
const eventUtils = require('../utils/eventUtils')

const getNewsHandle = async (req, res) => {
    try {
    const user = jwtUtils.getUserByReq(req);

    const [news, events] = await Promise.all([
        newUtils.getAllNews(user),
        eventUtils.getAllEvent(user)
    ]);
    const combinedData = [...news, ...events];

   
    return res.status(200).send(combinedData);;
    } catch {
        return res.status(500).send("Ошибка при получение новостей.");
    }
}

module.exports = {getNewsHandle}