const likeUtils = require('./likeUtils');
const News = require('../model/newsModel');

const getAllNews = async (user) => {
    const user_id = user._id;
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7); 

    await News.News.deleteMany({ date: { $gt: currentDate } });

    const news = await News.News.find({ date: { $lte: oneWeekAgo } }); 
    
    return news.map(newr => ({
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