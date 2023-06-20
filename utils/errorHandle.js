const {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR
} = require('./constants')

module.exports.errorHandle = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(VALIDATION_ERROR).send({ message: 'Некорректные данные' })
  } else if (err.message === 'NotFound') {
    res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' })
  } else if (err.name === 'CastError') {
    res.status(VALIDATION_ERROR).send({ message: 'Некорректные данные' })
  }
  else {
    res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' })
  }
}
