const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const likes = [];
  const createdAt = Date().now;
  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate( req.params.cardId,
    { $addToSet: { likes: req.user._id } },{ new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}