const User = require('../models/user');
const { errorHandle } = require('../utils/errorHandle');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch((err) => errorHandle(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new Error('NotFound')})
    .then((user) => res.send(user))
    .catch((err) => errorHandle(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => errorHandle(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new Error('NotFound')})
    .then(user => res.send(user))
    .catch((err) => errorHandle(err, res));
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id,  req.body , { new: true, runValidators: true })
    .orFail(() => { throw new Error('NotFound')})
    .then(user => res.send(user))
    .catch((err) => errorHandle(err, res));
}