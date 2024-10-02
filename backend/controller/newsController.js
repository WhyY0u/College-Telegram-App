const User = require('../model/userModel');
const { validationResult } = require('express-validator');
const jwtUtils = require('../utils/jwtUtils')
const getNewsHandle = (req, res) => {
    const user = jwtUtils.getUserByReq(req);
}

module.exports = {getNewsHandle}