module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { userGroupCdcHelper, userGroupSdpHelper } = container.resolve('helper')

  const getUserGroup = async (q) => {
    // const key = `getUserGroup-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, userGroupSdpHelper.getUserGroup, q)
    return userGroupSdpHelper.getUserGroup(q)
  }
  const getUserGroupById = async (id) => {
    const key = `getUserGroupById-${id}`
    return handleCacheOnRepo(key, userGroupSdpHelper.getUserGroupById, id)
  }

  const createUserGroup = async (body) => {
    return userGroupCdcHelper.createUserGroup(body)
  }

  const updateUserGroup = async (id, body) => {
    return userGroupCdcHelper.updateUserGroup(id, body)
  }

  const deleteUserGroup = async (id) => {
    return userGroupCdcHelper.deleteUserGroup(id)
  }
  const deleteUserGroupByUserAndGroup = async (body) => {
    return userGroupCdcHelper.deleteUserGroupByUserAndGroup(body)
  }
  return {
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    getUserGroup,
    getUserGroupById,
    deleteUserGroupByUserAndGroup
  }
}
