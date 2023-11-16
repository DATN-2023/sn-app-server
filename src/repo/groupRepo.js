module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { groupCdcHelper, groupSdpHelper } = container.resolve('helper')

  const getGroup = async (q) => {
    // const key = `getGroup-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, groupSdpHelper.getGroup, q)
    return groupSdpHelper.getGroup(q)
  }
  const getGroupById = async (id) => {
    const key = `getGroupById-${id}`
    return handleCacheOnRepo(key, groupSdpHelper.getGroupById, id)
  }

  const createGroup = async (body) => {
    return groupCdcHelper.createGroup(body)
  }

  const updateGroup = async (id, body) => {
    return groupCdcHelper.updateGroup(id, body)
  }

  const deleteGroup = async (id) => {
    return groupCdcHelper.deleteGroup(id)
  }
  return {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    getGroupById
  }
}
