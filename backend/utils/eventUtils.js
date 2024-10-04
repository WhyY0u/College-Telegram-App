const likeUtils = require('./likeUtils');
const Event = require('../model/eventModel');


const getAllEvent = async (user) => {
    const user_id = user._id;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    await Event.Event.deleteMany({ start: { $lt: oneWeekAgo } });

    const events = await Event.Event.find(); 
    return events
        .filter(event => new Date(event.start) >= oneWeekAgo) 
        .map(event => ({
            _id: event._id,
            date: event.date,
            heading: event.heading,
            description: event.description,
            likes: event.likes.length,
            images: event.images,
            start: event.start,
            place: event.place,
            isLiked: likeUtils.isLikedPost(event.likes, user_id),
            type: "Мероприятие",
        }));
}



module.exports = {getAllEvent};