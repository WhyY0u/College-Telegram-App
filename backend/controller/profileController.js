const ProfileUtils = require('../utils/profileUtils');
const JwtUtils = require('../utils/jwtUtils');
const file = require('../utils/fileUtils')
const multer = require('multer');

const getProfile = async (req, res) => {
    try {
       const currntuser = await JwtUtils.getUserByReq(req);
       const profile = await ProfileUtils.getProfileByID(currntuser._id);
       if(profile == null) {
        return res.status(403).send("Профиль не найден");
       }
       return res.status(200).send(profile);
    } catch {
        return res.status(400).send("Ошибка при получение профиля");
    }
}

const updProfile = async (req, res) => {
    const {description} = req.body;
    
    try {
       const currntuser = await JwtUtils.getUserByReq(req);
       const getProfile = await ProfileUtils.getProfileByID(currntuser._id);
       
       const updProfile = { user_id: currntuser._id};
       if(description != null && description.length > 0) {
       updProfile.description = description
       }
       if (req.file) {
        try {
           if(getProfile.image != null && getProfile.image != "") await file.deleteImage('imgProfile', getProfile.image);
          const name = await file.saveImage(req, "imgProfile");
          updProfile.image = name;
        } catch (err) {
          if (err instanceof multer.MulterError) {
            return res.status(400).send("Файл слишком большой.");
          } else {
            console.log(err);
            return res.status(500).send("Ошибка загрузки файла.");
          }
        }
      }
      await ProfileUtils.update(getProfile._id, updProfile)
      return res.status(200).send("Успешно");
    } catch (err) {
      console.error(err);
        return res.status(400).send("Ошибка обновление профиля");
    }
}


module.exports = {getProfile, updProfile}