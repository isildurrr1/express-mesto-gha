const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000, NOT_FOUND_ERROR } = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')

app.use((req, res, next) => {
  req.user = {_id: '648ff33c8f6494529d01f8da'};
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Введите корректный путь' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));