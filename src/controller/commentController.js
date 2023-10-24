module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { commentRepo } = container.resolve('repo')

  const createComment = async (req, res) => {
    try {
      const { _id } = req.userToken
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await commentRepo.createComment(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateComment = async (req, res) => {
    try {
      const { _id } = req.userToken
      const { id } = req.params
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await commentRepo.updateComment(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteComment = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await commentRepo.deleteComment(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getComment = async (req, res) => {
    try {
      const { statusCode, data, msg } = await commentRepo.getComment(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getCommentById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await commentRepo.getCommentById(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    createComment,
    updateComment,
    deleteComment,
    getCommentById,
    getComment
  }
}
