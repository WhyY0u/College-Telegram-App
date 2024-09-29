
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModelUtils = require("./userModelUtils")
const { SECRETKEY } = process.env;

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRETKEY);
        const user = await UserModelUtils.findByLogin(decoded.login);
        return user.token == token ? user : null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getUserByReq = async (req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const user = await verifyToken(token);
    return user;
  }

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  };
  
  const comparePassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
  };

  const createToken = (login, name, surname, role) => {
    const expiresIn = '7d';
    const token = jwt.sign({login: login, name: name, surname: surname, role: role }, SECRETKEY, { expiresIn });
    return token;
  };



  module.exports = {verifyToken, hashPassword, createToken, comparePassword, getUserByReq};