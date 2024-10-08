const User = require('../model/userModel');
const Jwt = require('../utils/jwtUtils')
const UserModelUtils = require('../utils/userModelUtils');
const { validationResult } = require('express-validator');
const Profile = require('../model/profileModel')

const checkEmailHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const checkEmail = await UserModelUtils.findByEmail(email);
    return checkEmail == null 
      ? res.status(400).send("Почта уже занята") 
      : res.status(201).send("Почта свободна");
  } catch {
    res.status(500).send("Ошибка при проверки почты");
  }
};

const checktoken = async (req, res) => {
  try {
   const user = Jwt.getUserByReq(req);
   if(user != null) {
    return res.status(201).send('Токен валидный');
   } else {
    return res.status(400).send('Токен не дествителен'); 
   }

  } catch {
    return res.status(500).send("Ошибка при проверки токена");
  }
};

const checkLoginHandler = async (req, res) => {
  const { login } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const checkLogin = await UserModelUtils.findByEmail(login);
    return checkLogin == null 
      ? res.status(400).send("Логин уже занят") 
      : res.status(201).send("Логин свободен");
  } catch {
    res.status(500).send("Ошибка при проверки логина");
  }
};


  const registerHandle = async (req, res) => {
  const { login, name, surname, patronymic, email, password } = req.body;
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
     }

    if(await UserModelUtils.findByLogin(login) != null)  return res.status(400).send("Логин уже занят");
    if(await UserModelUtils.findByEmail(email) != null)  return res.status(400).send("Почта уже занята");

    const token = Jwt.createToken(login, name, surname, 'Student', patronymic);
    const pswd = await Jwt.hashPassword(password);

    const newUser = new User.User({ login, name, surname, patronymic, email, password: pswd, role: User.Role.Student, token: token });
    await newUser.save();
    const profile = new Profile.Profile({ user_id: newUser._id, description: "", image: "" });
    await profile.save();

    return res.status(201).send(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Ошибка при регистрации пользователя");
  }
};

const loginHandle = async(req, res) => {
const {login, password} = req.body;
 try {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

  const user = await UserModelUtils.findByLogin(login);
  
  if(!user) {
    return res.status(400).send("Неверный логин или пароль");
  }
  const isMatch = await Jwt.comparePassword(password, user.password);
  if(isMatch) {
    if(user.token != null && await Jwt.verifyToken(user.token)) {
      res.status(200).send(user.token);
      return;
    } else {
      const newToken = Jwt.createToken(user.login, user.name, user.surname, user.role);
      await UserModelUtils.updateUserById(user._id, { token: newToken });
      res.status(200).send(newToken);
      return;
    }
  }
  return res.status(400).send("Неверный логин или пароль");

 } catch (error) {
  console.log(error);
  return res.status(500).send("Ошибка при Авторизации");
 }
}

module.exports = {loginHandle, registerHandle, checkEmailHandler, checkLoginHandler, checktoken}