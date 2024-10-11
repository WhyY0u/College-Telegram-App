const likeUtils = require('./likeUtils');
const Event = require('../model/eventModel');
const Image = require('../utils/fileUtils')
const dateUtils = require('./dateUtils')

const getAllEvent = async (user) => {
    const user_id = user._id;
    const date = dateUtils.getCurrentDateInPavlodar();
    const oneWeekAgo = new Date(date);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const eventsToDelete = await Event.Event.find({ start: { $lt: oneWeekAgo } });
    const imagesToDelete = eventsToDelete.flatMap(event => event.images);
    await deleteImage(imagesToDelete);
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
const deleteImage = async (imageIds) => {
    await Promise.all(imageIds.map(images => {
        if(images != null && images != "") return Image.deleteImage("imgEvent", images); 
    }));
}


module.exports = {getAllEvent};