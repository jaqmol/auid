/* Copyright 2017 Ronny Reichmann */
/* global test expect */

const auid = require('./auid')

test('uniqueness', () => {
  const testAuidsArr = [...(new Array(999))].map(() => auid())
  const testAuidsSet = new Set(testAuidsArr)
  expect(testAuidsArr.length).toBe(testAuidsSet.size)
})

test('sortability', () => {
  const unsortedIds = [...(new Array(999))].map(() => auid())
  const sortedIds = unsortedIds.slice()
  sortedIds.sort()
  expect(unsortedIds).toEqual(sortedIds)
})
