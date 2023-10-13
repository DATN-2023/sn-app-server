module.exports = container => {
  const userHelper = require('./userHelper')(container)
  const testHelper = require('./testHelper')(container)
  return { userHelper, testHelper }
}
