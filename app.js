const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const { errors } = require('celebrate');
const handleErrors = require('./middlewares/handleErrors');

const {
  loginValid,
  createUserValid,
} = require('./middlewares/validation');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.post('/signin', loginValid, login);

app.post('/signup', createUserValid, createUser);

app.use(errors());
app.use(handleErrors);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
