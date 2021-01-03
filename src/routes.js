const express = require ('express');

const routes = express.Router();

const user = require('./controllers/user');
const auth = require('./middlewares/auth');

//public routes
routes.post('/register', user.register);
routes.post('/login', user.authenticate);


routes.use(auth);
//private routes


module.exports = routes;