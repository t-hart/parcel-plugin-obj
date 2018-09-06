const { Asset } = require('parcel-bundler')

const minMax = (min, max, vals) => ({
  max: max.map((x, i) => Math.max(x, vals[i])),
  min: min.map((x, i) => Math.min(x, vals[i]))
})

// add alpha if it's missing or return a default color if we get invalid input
const parseColors = (cs) =>
  cs.length === 4 ? cs
    : cs.length === 3 ? [...cs, 1]
      : [1, 1, 1, 1]

class ObjManifest extends Asset {
  constructor (name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
  }

  parse (str) {
    this.code = str.split('\n').reduce((acc, x) => {
      const l = x.split(' ')
      const values = l.slice(1, 4).map(parseFloat)
      switch (l[0]) {
        case 'v':
          const colors = l.slice(4, 8).map(parseFloat)
          const { min, max } = minMax(acc.min, acc.max, values)
          return { ...acc, v: [...acc.v, ...values], colors: [...acc.colors, ...parseColors(colors)], min, max }
        case 'vn':
          return { ...acc, vn: [...acc.vn, ...values] }
        case 'vt':
          return { ...acc, vt: [...acc.vt, ...values] }
        case 'f':
          return { ...acc, f: [...acc.f, ...values.map(x => x - 1)] }
        default:
          return acc
      }
    }, {
      v: [],
      vt: [],
      vn: [],
      f: [],
      colors: [],
      min: [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      max: [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
    })
  }

  async generate () {
    return {
      js: `module.exports = ${JSON.stringify(this.code)}`
    }
  }
}

module.exports = ObjManifest
