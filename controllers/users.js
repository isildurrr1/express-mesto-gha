const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() =>
    {
      if (res.status(400)) res.send({ message: 'Произошла ошибка 400' })
      else res.send({ message: 'Произошла ошибка' })
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() =>
    {
      if (res.status(404)) res.send({ message: 'Произошла ошибка 404' })
      else res.send({ message: 'Произошла ошибка' })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() =>
    {
      if (res.status(400)) res.send({ message: 'Произошла ошибка 400' })
      else res.send({ message: 'Произошла ошибка' })
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then(user => res.send(user))
    .catch(() =>
    {
      if (res.status(404)) res.send({ message: 'Произошла ошибка 404' })
      else if (res.status(400)) res.send({ message: 'Произошла ошибка 400' })
      else res.send({ message: 'Произошла ошибка' })
    });
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id,  req.body , { new: true })
    .then(user => res.send(user))
    .catch(() =>
    {
      if (res.status(404)) res.send({ message: 'Произошла ошибка 404' })
      else if (res.status(400)) res.send({ message: 'Произошла ошибка 400' })
      else res.send({ message: 'Произошла ошибка' })
    });
}