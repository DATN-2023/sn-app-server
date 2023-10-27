module.exports = container => {
  const userHelper = require('./userHelper')(container)
  const feedCdcHelper = require('./feedCdcHelper')(container)
  const feedSdpHelper = require('./feedSdpHelper')(container)
  const commentSdpHelper = require('./commentSdpHelper')(container)
  const commentCdcHelper = require('./commentCdcHelper')(container)
  const reactionCdcHelper = require('./reactionCdcHelper')(container)
  const reactionSdpHelper = require('./reactionSdpHelper')(container)
  const uploadSdpHelper = require('./uploadSdpHelper')(container)
  return {
    userHelper,
    feedCdcHelper,
    feedSdpHelper,
    commentSdpHelper,
    commentCdcHelper,
    reactionCdcHelper,
    reactionSdpHelper,
    uploadSdpHelper
  }
}
