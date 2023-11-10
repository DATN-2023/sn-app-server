module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { feedCdcHelper, feedSdpHelper } = container.resolve('helper')

  const getFeed = async (q) => {
    // const key = `getFeed-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, feedSdpHelper.getFeed, q)
    return feedSdpHelper.getFeed(q)
  }
  const getFeedById = async (id) => {
    const key = `getFeedById-${id}`
    return handleCacheOnRepo(key, feedSdpHelper.getFeedById, id)
  }

  const getFeedsOfUser = async (id) => {
    const key = `getFeedsOfUser-${id}`
    return handleCacheOnRepo(key, feedSdpHelper.getFeedsOfUser, id)
  }

  const createFeed = async (body) => {
    return feedCdcHelper.createFeed(body)
  }

  const updateFeed = async (id, body) => {
    return feedCdcHelper.updateFeed(id, body)
  }

  const deleteFeed = async (id) => {
    return feedCdcHelper.deleteFeed(id)
  }
  return {
    createFeed,
    updateFeed,
    deleteFeed,
    getFeed,
    getFeedById,
    getFeedsOfUser
  }
}
