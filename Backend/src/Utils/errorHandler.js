module.exports = (res, error) => {
  res.status(404).send({
    success: false,
    message: error.message ? error.message : error
  })
}