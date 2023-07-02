const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Ошибка авторизации'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'my-jwt-token');
  } catch (err) {
    return next(new AuthError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};
