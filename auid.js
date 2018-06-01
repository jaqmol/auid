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
const randomNum = () => parseInt(randomBytes(2).toString('hex'), 16)

function auid () {
  const stampComp = converter.encode(Date.now())
  const countComp = pad(converter.encode(currentCount), 4)
  currentCount = currentCount === 11111111
    ? 0
    : currentCount + 1
  const zoneComp = pad(converter.encode(utcMinus12 + zoneOffset()), 2)
  const randomComp = pad(converter.encode(randomNum()), 3)
  return `${stampComp}-${countComp}-${zoneComp}-${randomComp}`
}

auid.BaseConverter = BaseConverter
auid.converter = converter
auid.encodingSet = encodingSet

module.exports = auid
