const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const babel =require('rollup-plugin-babel');
const version = process.env.VERSION || require('../package.json').version
const banner = `
/**
 * we-plugins v${version}
 * (c) ${new Date().getFullYear()} zm
 * @license MIT
 */
`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser development
  {
    file: resolve('lib/we-plugins.min.js'),
    format: 'umd',
    env: 'production'
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('./libraries/index.js'),
      plugins: [
        flow(),
        node(),
        cjs(),
        babel({
          runtimeHelpers: true,
          exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        replace({ __VERSION__: version }),
        buble()
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: '$utils'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}
