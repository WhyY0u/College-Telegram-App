const Likes = require('../model/likesModel')

const isLikedPost = async (likes, user_id) => {
    const isLiked = likes.some(like => like.user_id == user_id);
    return isLiked;
}



module.exports = {isLikedPost};