'use strict'

const fs = require('fs')
const { generateKeyPairSync } = require('crypto')

const generateAndSaveKeyPair = (secretPassphrase, publicKeyPath, privateKeyPath) => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: secretPassphrase
    }
  })

  fs.writeFileSync(publicKeyPath, publicKey)
  fs.writeFileSync(privateKeyPath, privateKey)
}

module.exports = { generateAndSaveKeyPair }
