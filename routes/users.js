const router = require('express').Router();

const {
  updateProfileValid,
  updateAvatarValid,
  checkUserIdValid,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserMe,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // GET /users — возвращает всех пользователей

router.get('/me', getUserMe); // GET /users/me - возвращает информацию о текущем пользователе

router.get('/:userId', checkUserIdValid, getUser); // GET /users/:userId - возвращает пользователя по _id

router.patch('/me', updateProfileValid, updateProfile); // PATCH /users/me — обновляет профиль

router.patch('/me/avatar', updateAvatarValid, updateAvatar); // PATCH /users/me/avatar — обновляет аватар

module.exports = router;
