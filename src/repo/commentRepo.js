module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { commentCdcHelper, commentSdpHelper } = container.resolve('helper')

  const getComment = async (q) => {
    const key = `getComment-${q.constructor === Object ? JSON.stringify(q) : q}`
    return handleCacheOnRepo(key, commentSdpHelper.getComment, q)
  }
  const getCommentById = async (id) => {
    const key = `getCommentById-${id}`
    return handleCacheOnRepo(key, commentSdpHelper.getCommentById, id)
  }

  const createComment = async (body) => {
    return commentCdcHelper.createComment(body)
  }

  const updateComment = async (id, body) => {
    return commentCdcHelper.updateComment(id, body)
  }

  const deleteComment = async (id) => {
    return commentCdcHelper.deleteComment(id)
  }
  return {
    createComment,
    updateComment,
    deleteComment,
    getComment,
    getCommentById
  }
}
