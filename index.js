'use strict'

const fs = require('fs')
const jwt = require('jsonwebtoken')

const { generateAndSaveKeyPair } = require('./generateAndSaveKeyPair')

const publicKeyPath = './publicKey.pem'
const privateKeyPath = './privateKey.pem'
const secretPassphrase = 'top secret'

const keyPairExists = fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath)

if (!keyPairExists) {
  generateAndSaveKeyPair(secretPassphrase, publicKeyPath, privateKeyPath)
}

const publicKey = fs.readFileSync(publicKeyPath)
const privateKey = fs.readFileSync(privateKeyPath)

const objectToSign = { foo: 'bar' }

const token = jwt.sign(objectToSign, { key: privateKey, passphrase: secretPassphrase }, { algorithm: 'RS512' })

jwt.verify(token, publicKey)
