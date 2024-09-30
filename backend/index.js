require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./model/userModel')

const middleware = require('./middleware/middleware');
const authoRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const confidantRouter = require('./router/confidantRouter');
const imageRouter = require('./router/imageRouter');

const PORT = process.env.PORT || 3000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}`);

const app = express();
app.use(bodyParser.json());

app.use('/auth', authoRouter);
app.use('/user', middleware.RoleAndAuthoMiddleware(User.Role.Student), userRouter);
app.use('/confidant', middleware.RoleAndAuthoMiddleware(User.Role.Confidant), confidantRouter);
app.use('/image', middleware.authMiddleware, imageRouter);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});