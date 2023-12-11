module.exports = (container) => {
    const logger = container.resolve('logger')
    const {httpCode, serverHelper} = container.resolve('config')
    const {chatRepo} = container.resolve('repo')

    const createChannel = async (req, res) => {
        try {
            const {_id} = req.userToken
            const body = req.body
            if (!body.members || !body.members.length || body.members[0] === _id) return res.status(httpCode.BAD_REQUEST).json({ok: false})
            body.members.push(_id)
            const {statusCode, data, msg} = await chatRepo.createChannel(body)
            if (statusCode !== httpCode.SUCCESS) {
                return res.status(httpCode.BAD_REQUEST).json(msg)
            }
            res.status(statusCode).json(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({msg: 'UNKNOWN ERROR'})
        }
    }

    const updateChannel = async (req, res) => {
        try {
            const {id} = req.params
            const body = req.body
            const {statusCode, data, msg} = await chatRepo.updateChannel(id, body)
            if (statusCode !== httpCode.SUCCESS) {
                return res.status(httpCode.BAD_REQUEST).json(msg)
            }
            res.status(statusCode).json(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({msg: 'UNKNOWN ERROR'})
        }
    }

    const deleteChannel = async (req, res) => {
        try {
            const {id} = req.params
            const {statusCode, data, msg} = await chatRepo.deleteChannel(id)
            if (statusCode !== httpCode.SUCCESS) {
                return res.status(httpCode.BAD_REQUEST).json(msg)
            }
            res.status(statusCode).json(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({msg: 'UNKNOWN ERROR'})
        }
    }
    return {
        createChannel,
        updateChannel,
        deleteChannel
    }
}
