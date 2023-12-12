module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { chatCdcHelper, chatSdpHelper } = container.resolve('helper')

  const createChannel = async (body) => {
    return chatCdcHelper.createChannel(body)
  }

  const updateChannel = async (id, body) => {
    return chatCdcHelper.updateChannel(id, body)
  }

  const deleteChannel = async (id) => {
    return chatCdcHelper.deleteChannel(id)
  }

  const getMessage = async (q) => {
    // const key = `getMessage-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, messageSdpHelper.getMessage, q)
    return chatSdpHelper.getMessage(q)
  }
  const getMessageById = async (id) => {
    const key = `getMessageById-${id}`
    return handleCacheOnRepo(key, chatSdpHelper.getMessageById, id)
  }

  return {
    createChannel,
    updateChannel,
    deleteChannel,
    getMessage,
    getMessageById
  }
}
