/* Copyright 2017 Ronny Reichmann */
/* AUID Acceptably Unique Identifier */

require('./string-pad-start-polyfill')
const BaseConverter = require('./base-converter')
const encodingSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const converter = new BaseConverter(encodingSet)
const randomBytes = require('crypto').randomBytes
let currentCount = 0
const padFn = v => (s, l) => s.padStart(l, v)
const pad = padFn(encodingSet.slice(0, 1))
const utcMinus12 = 12 * 60
const zoneOffset = () => (new Date()).getTimezoneOffset()

function auid () {
  const zoneComp = pad(converter.encode(utcMinus12 + zoneOffset()), 2)
  const stampComp = converter.encode(Date.now())
  const countComp = pad(converter.encode(currentCount), 4)
  currentCount = currentCount === 11111111
    ? 0
    : currentCount + 1
  const randomHex = randomBytes(2).toString('hex')
  const randomComp = pad(converter.encode(parseInt(randomHex, 16)), 3)
  return `${zoneComp}-${stampComp}-${countComp}-${randomComp}`
}

auid.BaseConverter = BaseConverter
auid.converter = converter
auid.encodingSet = encodingSet

module.exports = auid
