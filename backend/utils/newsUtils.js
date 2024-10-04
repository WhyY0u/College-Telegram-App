const likeUtils = require('./likeUtils');
const News = require('../model/newsModel');

const getAllNews = async (user) => {
    const user_id = user._id;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    await News.News.deleteMany({ date: { $lt: oneWeekAgo } });

    const news = await News.News.find(); 
    return news
        .filter(newr => new Date(newr.date) >= oneWeekAgo) 
        .map(newr => ({
            _id: newr._id,
            date: newr.date,
            heading: newr.heading,
            description: newr.description,
            likes: newr.likes.length,
            images: newr.images,
            isLiked: likeUtils.isLikedPost(newr.likes, user_id),
            type: "Новость",
        }));
}


module.exports = {getAllNews};