const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')

app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {_id: '648ff33c8f6494529d01f8da'};
  next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))