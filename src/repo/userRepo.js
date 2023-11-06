module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { userCdcHelper, userSdpHelper } = container.resolve('helper')

  const getUser = async (q) => {
    const key = `getUser-${q.constructor === Object ? JSON.stringify(q) : q}`
    return handleCacheOnRepo(key, userSdpHelper.getUser, q)
    // return userSdpHelper.getUser(q)
  }
  const getUserById = async (id) => {
    const key = `getUserById-${id}`
    return handleCacheOnRepo(key, userSdpHelper.getUserById, id)
  }
  const getFriend = async (q) => {
    const key = `getFriend-${q.constructor === Object ? JSON.stringify(q) : q}`
    return handleCacheOnRepo(key, userSdpHelper.getFriend, q)
    // return userSdpHelper.getUser(q)
  }
  const getFriendById = async (id) => {
    const key = `getFriendById-${id}`
    return handleCacheOnRepo(key, userSdpHelper.getFriendById, id)
  }
  const createUser = async (body) => {
    return userCdcHelper.createUser(body)
  }

  const updateUser = async (id, body) => {
    return userCdcHelper.updateUser(id, body)
  }

  const deleteUser = async (id) => {
    return userCdcHelper.deleteUser(id)
  }
  const createFriend = async (body) => {
    return userCdcHelper.createFriend(body)
  }

  const updateFriend = async (id, body) => {
    return userCdcHelper.updateFriend(id, body)
  }

  const deleteFriend = async (id) => {
    return userCdcHelper.deleteFriend(id)
  }
  return {
    getUser,
    getUserById,
    getFriend,
    getFriendById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    updateFriend,
    deleteFriend
  }
}
