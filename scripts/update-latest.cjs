const pjson = require('../package.json')
const fs = require('fs')
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const root = path.resolve(__dirname)
const source = root + '/../website/static/latest.json'

async function creatLatest() {
  const response = await fetch(
    `${pjson.repository.url}/releases/download/${pjson.name}-v${
      pjson.version
    }/${pjson.displayName.replace(/\s+/g, '.')}.app.tar.gz.sig`
  )

  const windowsResponse = await fetch(
    `${pjson.repository.url}/releases/download/${pjson.name}-v${
      pjson.version
    }/${pjson.displayName.replace(/\s+/g, '.')}_${pjson.version}_x64_en-US.msi.zip.sig`
  )
  const unixSig = await response.text()
  const windowSig = await windowsResponse.text()

  const content = {
    version: 'v' + pjson.version,
    notes: 'something awesome just got an update',
    pub_date: new Date().toISOString(),
    platforms: {
      'darwin-x86_64': {
        signature: unixSig,
        url: `${pjson.repository.url}/releases/download/${pjson.name}-v${
          pjson.version
        }/${pjson.displayName.replace(/\s+/g, '.')}.app.tar.gz`,
      },
      'darwin-aarch64': {
        signature: unixSig,
        url: `${pjson.repository.url}/releases/download/${pjson.name}-v${
          pjson.version
        }/${pjson.displayName.replace(/\s+/g, '.')}.app.tar.gz`,
      },
      'linux-x86_64': {
        signature: unixSig,
        url: `${pjson.repository.url}/releases/download/${pjson.name}-v${
          pjson.version
        }/${pjson.displayName.replace(/\s+/g, '.')}.app.tar.gz`,
      },
      'windows-x86_64': {
        signature: windowSig,
        url: `${pjson.repository.url}/releases/download/${pjson.name}-v${
          pjson.version
        }/${pjson.displayName.replace(/\s+/g, '.')}_${pjson.version}_x64_en-US.msi`,
      },
    },
  }

  fs.readFile(source, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }

    fs.writeFile(source, JSON.stringify(content), 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

creatLatest()
