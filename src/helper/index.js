module.exports = container => {
  const userHelper = require('./userHelper')(container)
  const feedCdcHelper = require('./feedCdcHelper')(container)
  const feedSdpHelper = require('./feedSdpHelper')(container)
  const commentSdpHelper = require('./commentSdpHelper')(container)
  const commentCdcHelper = require('./commentCdcHelper')(container)
  const reactionCdcHelper = require('./reactionCdcHelper')(container)
  const reactionSdpHelper = require('./reactionSdpHelper')(container)
  const uploadSdpHelper = require('./uploadSdpHelper')(container)
  const userSdpHelper = require('./userSdpHelper')(container)
  const userCdcHelper = require('./userCdcHelper')(container)
  const groupCdcHelper = require('./groupCdcHelper')(container)
  const groupSdpHelper = require('./groupSdpHelper')(container)
  const userGroupSdpHelper = require('./userGroupSdpHelper')(container)
  const userGroupCdcHelper = require('./userGroupCdcHelper')(container)
  const modCdcHelper = require('./modCdcHelper')(container)
  const modSdpHelper = require('./modSdpHelper')(container)
  const notificationSdpHelper = require('./notificationSdpHelper')(container)
  const fcmtokenCdcHelper = require('./fcmtokenCdcHelper')(container)
  const notificationCdcHelper = require('./notificationCdcHelper')(container)
  const chatCdcHelper = require('./chatCdcHelper')(container)
  return {
    userHelper,
    feedCdcHelper,
    feedSdpHelper,
    commentSdpHelper,
    commentCdcHelper,
    reactionCdcHelper,
    reactionSdpHelper,
    uploadSdpHelper,
    userSdpHelper,
    userCdcHelper,
    groupCdcHelper,
    groupSdpHelper,
    userGroupCdcHelper,
    userGroupSdpHelper,
    modCdcHelper,
    modSdpHelper,
    notificationSdpHelper,
    fcmtokenCdcHelper,
    notificationCdcHelper,
    chatCdcHelper
  }
}
