module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { reactionRepo } = container.resolve('repo')

  const createReaction = async (req, res) => {
    try {
      const { _id } = req.userToken
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await reactionRepo.createReaction(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateReaction = async (req, res) => {
    try {
      const { _id } = req.userToken
      const { id } = req.params
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await reactionRepo.updateReaction(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteReaction = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await reactionRepo.deleteReaction(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getReaction = async (req, res) => {
    try {
      const { statusCode, data, msg } = await reactionRepo.getReaction(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getReactionById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await reactionRepo.getReactionById(id)
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
    createReaction,
    updateReaction,
    deleteReaction,
    getReactionById,
    getReaction
  }
}
