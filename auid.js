/* Copyright 2017 Ronny Reichmann */
/* AUID Acceptably Unique Identifier */

const encodingSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const converter = require('./base-converter')(encodingSet)
const randomBytes = require('crypto').randomBytes
let currentCount = 0

function auid () {
  const zoneComp = converter.encode(730 + (new Date()).getTimezoneOffset())
  const stampComp = converter.encode(Date.now())
  const countComp = converter.encode(currentCount)
  currentCount = currentCount === 11111111
    ? 0
    : currentCount + 1
  const randomHex = randomBytes(2).toString('hex')
  const randomComp = converter.encode(parseInt(randomHex, 16))
  return `${zoneComp}-${stampComp}-${countComp}-${randomComp}`
}

module.exports = auid
