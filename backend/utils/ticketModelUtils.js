const Ticket = require('../model/ticketModel');

const getTicketsByCreatorId = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    const tickets = await Ticket.Ticket.find({ creatorid: userId }) 
    .skip(skip)
    .limit(limit);

    return tickets.map(ticket => ({
            _id: ticket._id, 
            heading: ticket.heading,
            status: ticket.status,
            type: ticket.type,
        }));
};
const getTickets = async (page, limit) => {
    const skip = (page - 1) * limit;
    const tickets = await Ticket.Ticket.find()
        .skip(skip)
        .limit(limit);

    return tickets.map(ticket => ({
        _id: ticket._id, 
        heading: ticket.heading,
        status: ticket.status,
        type: ticket.type,
    }));
};
const countTicketsByCreatorId = async (creatorId) => {
    return await Ticket.Ticket.countDocuments({ creatorid: creatorId });
};
const countTickets = async () => {
    return await Ticket.Ticket.countDocuments();
};
async function findTicketByID(id) {
    const existingUser = await Ticket.Ticket.findOne({
      $or: [{ _id: id }]
    });
    return existingUser;
  }

  const updateTicketById = async (id, updatedData) => {
    try {
        const result = await Ticket.Ticket.findByIdAndUpdate(id, updatedData, { new: true });
        return result;
    } catch (err) {
        console.error('Ошибка при обновлении тикета:', err);
        throw err;
    }
  };
module.exports = {countTicketsByCreatorId, getTicketsByCreatorId, countTickets, getTickets, findTicketByID, updateTicketById};