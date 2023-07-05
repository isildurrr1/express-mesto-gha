const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const BadReqError = require('../errors/BadReqError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => next(err));
  });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Ошибка авторизации');
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
          res.status(200).send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не найдено');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Переданы некорректные данные'));
      }
      next(err);
    });
};
