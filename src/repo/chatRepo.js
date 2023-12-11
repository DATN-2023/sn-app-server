module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { chatCdcHelper } = container.resolve('helper')

  const createChannel = async (body) => {
    return chatCdcHelper.createChannel(body)
  }

  const updateChannel = async (id, body) => {
    return chatCdcHelper.updateChannel(id, body)
  }

  const deleteChannel = async (id) => {
    return chatCdcHelper.deleteChannel(id)
  }
  return {
    createChannel,
    updateChannel,
    deleteChannel
  }
}
