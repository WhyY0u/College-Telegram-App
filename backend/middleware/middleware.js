const Jwt = require('../utils/jwtUtils');

const authMiddleware = async (req, res, next) => {
    const user = await Jwt.getUserByReq(req);
    if(user) return next();
    return res.status(403).send("Доступ запрещён");
};
const RoleAndAuthoMiddleware = (role) =>  {
    return async (req, res, next) => { 
    const user = await Jwt.getUserByReq(req);
    if(user) {
        if(user.role == role) return next();
    }
    return res.status(403).send("Доступ запрещён");
  };
};


module.exports = {RoleAndAuthoMiddleware, authMiddleware};