const router = require('express').Router();

const {
  createCardValid,
  checkCardIdValid,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards); // GET /cards — возвращает все карточки

router.post('/', createCardValid, createCard); // POST /cards — создаёт карточку

router.delete('/:cardId', checkCardIdValid, deleteCard); // DELETE /cards/:cardId — удаляет карточку по идентификатору

router.put('/:cardId/likes', checkCardIdValid, likeCard); // PUT /cards/:cardId/likes — поставить лайк карточке

router.delete('/:cardId/likes', checkCardIdValid, dislikeCard); // DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = router;
