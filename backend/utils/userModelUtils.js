
const User = require('../model/userModel');


async function findByLogin(userLogin) {
    const existingUser = await User.User.findOne({
      $or: [{ login: userLogin }]
    });
    return existingUser;
  }
  
  const updateUserById = async (id, updatedData) => {
    try {
        const result = await User.User.findByIdAndUpdate(id, updatedData, { new: true });
        return result;
    } catch (err) {
        console.error('Ошибка при обновлении пользователя:', err);
        throw err;
    }
  };
  
  async function findByEmail(userEmail) {
    const existingUser = await User.User.findOne({
      $or: [{ email: userEmail }]
    });
    return existingUser;
  }

  async function findByID(id) {
    const existingUser = await User.User.findOne({
      $or: [{ _id: id }]
    });
    return existingUser;
  }
  
  module.exports = {findByLogin, updateUserById, findByEmail, findByID};