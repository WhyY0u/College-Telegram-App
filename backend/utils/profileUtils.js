const Profile = require('../model/profileModel');

async function getProfileByID(id) {
  try {
    const profile = await Profile.Profile.findOne({ user_id: id });
    return profile;
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    throw new Error("Не удалось получить профиль");
  }
}
async function getAllProfiles() {
  try {
    const profiles = await Profile.Profile.find({});
    return profiles;
  } catch (error) {
    console.error("Ошибка при получении профилей:", error);
    throw new Error("Не удалось получить профили");
  }
}
const update = async (id, updatedData) => {
  try {
      const result = await Profile.Profile.findByIdAndUpdate(id, updatedData, { new: true });
      return result;
  } catch (err) {
      console.error('Ошибка при обновлении тикета:', err);
      throw err;
  }
}

module.exports = { getProfileByID, getAllProfiles, update};
