module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { reactionCdcHelper, reactionSdpHelper } = container.resolve('helper')

  const getReaction = async (q) => {
    const key = `getReaction-${q.constructor === Object ? JSON.stringify(q) : q}`
    return handleCacheOnRepo(key, reactionSdpHelper.getReaction, q)
  }
  const getReactionById = async (id) => {
    const key = `getReactionById-${id}`
    return handleCacheOnRepo(key, reactionSdpHelper.getReactionById, id)
  }

  const createReaction = async (body) => {
    return reactionCdcHelper.createReaction(body)
  }

  const updateReaction = async (id, body) => {
    return reactionCdcHelper.updateReaction(id, body)
  }

  const deleteReaction = async (id) => {
    return reactionCdcHelper.deleteReaction(id)
  }
  return {
    createReaction,
    updateReaction,
    deleteReaction,
    getReaction,
    getReactionById
  }
}
