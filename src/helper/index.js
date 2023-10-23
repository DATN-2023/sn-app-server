module.exports = container => {
  const userHelper = require('./userHelper')(container)
  const feedCdcHelper = require('./feedCdcHelper')(container)
  const feedSdpHelper = require('./feedSdpHelper')(container)
  return { userHelper, feedCdcHelper, feedSdpHelper }
}
