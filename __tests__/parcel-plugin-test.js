/* global describe, it, expect */
const assertBundle = require('parcel-assert-bundle-tree')
const path = require('path')
const ObjPlugin = require('../src/index')
const Bundler = require('parcel-bundler')
const fs = require('fs')

const readFile = path => new Promise((resolve, reject) => fs.readFile(path, (err, data) => err ? reject(err) : resolve(data)))

const bundlerArg = () => ({
  outDir: path.join(__dirname, 'dist'),
  watch: false,
  cache: false,
  hmr: false,
  logLevel: 0
})

describe('Asset', () => {
  it('should output the parsed js object with values', async () => {
    const bundler = new Bundler(path.join(__dirname, './bunny.obj'), bundlerArg())
    ObjPlugin(bundler)
    const bundle = await bundler.bundle()
    assertBundle(bundle, {
      type: 'js',
      name: 'bunny.js',
      childBundler: [{ type: 'map' }]
    })
    expect({
      bundleContent: (await readFile(bundle.name)).toString()
    }).toEqual({
      bundleContent: expect.stringContaining('vt')
    })
  })
})
