module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { uploadSdpHelper } = container.resolve('helper')

  const getPresignedUrl = async (q) => {
    return uploadSdpHelper.getPresignedUrl(q)
  }
  return {
    getPresignedUrl
  }
}
