module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
