const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NotRightsError = require('../errors/NotRightsError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('NotFound');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new NotRightsError('Нет прав');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new NotFoundError('Не найдено');
        })
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError('Не найдено'); })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
