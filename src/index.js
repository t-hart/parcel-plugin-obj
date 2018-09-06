module.exports = function (bundler) {
  bundler.addAssetType('obj', require.resolve('./ObjAsset'))
}
