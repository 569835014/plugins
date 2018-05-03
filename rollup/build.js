
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const uglify = require('uglify-js')
const rollup = require('rollup')
const configs = require('./configs')

if (!fs.existsSync('lib')) {
  fs.mkdirSync('lib')
}

build(configs)
function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry ({ input, output }) {
  console.info(output)
  const isProd = /min\.js$/.test(output.file)
  return rollup.rollup(input)
    .then(bundle => bundle.generate(output))
    .then(({ code }) => {
      if (isProd) {
        // `minified` is the minified code
        const minified = uglify.minify(code, {
          output: {
            // when passed it must be a string and it will be prepended to the output literally.
            // The source map will adjust for this text.
            // Can be used to insert a comment containing licensing information, for example.
            preamble: output.banner,
            // escape Unicode characters in strings and regexps (affects directives with non-ascii characters becoming invalid)
            /* eslint-disable camelcase */
            ascii_only: true
            /* eslint-enable camelcase */
          }
        })
        if (minified.error) {
          console.log(JSON.stringify(minified, null, 2))
          throw new Error(minified.error)
        }
        return write(output.file, minified.code, true)
      } else {
        return write(output.file, code)
      }
    }).catch(e => {
      console.log(e)
    })

}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    function reportExamples (extra) {
      console.log(blue(path.relative(process.cwd(), dest.replace('lib', 'dists'))) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }


    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })

    fs.writeFile(dest.replace('lib', 'dists'), code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          reportExamples(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        reportExamples()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
