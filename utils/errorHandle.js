const VALIDATION_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

module.exports.errorHandle = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(VALIDATION_ERROR).send({ message: 'Некорректные данные' })
  } else if (err.name === 'CastError' || err.message === 'NotFound') {
    res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' })
  }
  else {
    res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' })
  }
}
