module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { modCdcHelper, modSdpHelper } = container.resolve('helper')

  const getMod = async (q) => {
    // const key = `getMod-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, modSdpHelper.getMod, q)
    return modSdpHelper.getMod(q)
  }
  const getModById = async (id) => {
    const key = `getModById-${id}`
    return handleCacheOnRepo(key, modSdpHelper.getModById, id)
  }

  const createMod = async (body) => {
    return modCdcHelper.createMod(body)
  }

  const updateMod = async (id, body) => {
    return modCdcHelper.updateMod(id, body)
  }

  const deleteMod = async (id) => {
    return modCdcHelper.deleteMod(id)
  }
  return {
    createMod,
    updateMod,
    deleteMod,
    getMod,
    getModById
  }
}
