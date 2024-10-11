const likeUtils = require('./likeUtils');
const News = require('../model/newsModel');
const Image = require('./fileUtils');
const dateUtils = require('./dateUtils')

const getAllNews = async (user) => {
    const user_id = user._id;
    const date = dateUtils.getCurrentDateInPavlodar();
    const currentDate = new Date(date);
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() + 7); 

    const newsToDelete = await  News.News.find({ date: { $lt: oneWeekAgo } });
    const imagesToDelete = newsToDelete.flatMap(news => news.images);
    await deleteImage(imagesToDelete);
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
const deleteImage = async (imageIds) => {
    await Promise.all(imageIds.map(images => {
        if(images != null && images != "") return Image.deleteImage("imgNews", images); 
    }));
}


module.exports = {getAllNews};