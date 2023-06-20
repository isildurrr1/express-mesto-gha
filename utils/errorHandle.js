module.exports.errorHandle = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: 'Некорректные данные' })
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Данные не найдены' })
  }
  else {
    res.status(500).send({ message: 'Произошла ошибка' })
  }
}