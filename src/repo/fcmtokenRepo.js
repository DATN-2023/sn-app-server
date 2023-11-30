module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { fcmtokenCdcHelper, fcmtokenSdpHelper } = container.resolve('helper')

  const createFcmtoken = async (body) => {
    return fcmtokenCdcHelper.createFcmtoken(body)
  }

  const updateFcmtoken = async (id, body) => {
    return fcmtokenCdcHelper.updateFcmtoken(id, body)
  }

  const deleteFcmtoken = async (id) => {
    return fcmtokenCdcHelper.deleteFcmtoken(id)
  }
  return {
    createFcmtoken,
    updateFcmtoken,
    deleteFcmtoken
  }
}
