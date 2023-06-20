const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, NOT_FOUND_ERROR } = require('./utils/constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '648ff33c8f6494529d01f8da' };
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Введите корректный путь' }));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
