/* Copyright 2018 Ronny Reichmann */
/* global test expect */

const encodingSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BaseConverter = require('./base-converter')

test('single sorting test', () => {
  const converter = new BaseConverter(encodingSet)
  const a = converter.encode(1)
  const b = converter.encode(2)
  expect(a < b).toBe(true)
})

test('mass sorting test', () => {
  const converter = new BaseConverter(encodingSet)
  const nums = [...(new Array(999))].map((_, idx) => converter.encode(idx))
  const sortedNums = nums.slice()
  sortedNums.sort((ea, eb) => {
    const na = converter.decode(ea)
    const nb = converter.decode(eb)
    if (na < nb) return -1
    if (na > nb) return 1
    return 0
  })
  expect(nums).toEqual(sortedNums)
})
