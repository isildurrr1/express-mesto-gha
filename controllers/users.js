const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorHandle } = require('../utils/errorHandle');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const BadReqError = require('../errors/BadReqError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandle(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((err) => errorHandle(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.send({ data: user }))
      .catch((err) => errorHandle(err, res));
  });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((err) => errorHandle(err, res));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((err) => errorHandle(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Ошибка авторизации'));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Ошибка авторизации');
          }
          const token = jwt.sign({ _id: user._id }, 'my-jwt-token', {
            expiresIn: '7d',
          });
          res.send({ token });
        })
        .catch((err) => errorHandle(err, res));
    })
    .catch((err) => errorHandle(err, res));
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Переданы некорректные данные'));
      }
      next(err);
    });
};
