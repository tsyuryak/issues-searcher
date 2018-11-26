import React from 'react'
import { getSplitter, getItems } from './search-field-func'

test('a string has splitter', () => {
  const s1 = /\s*\/{1,}\s*/
  const s2 = /\s+/
  const splitters = [s1, s2]
  const testString1 = 'Test     /  string'
  const res1 = getSplitter(testString1, splitters)
  expect(res1).toEqual(s1)

  const testString2 = 'Test                     string'
  const res2 = getSplitter(testString2, splitters)
  expect(res2).toEqual(s2)
})

test("Hasn't splitter", () => {
  const testString = 'Teststring'
  function getSplitterException() {
    getSplitter(testString, ['/'])
  }
  expect(getSplitterException).toThrow()
})

test('a string has two or more items after splitting', () => {
  const string1 = 'test/string'
  const splitter = getSplitter(string1, ['/'])
  const items = getItems(string1, splitter)
  expect(items.length).toBeGreaterThanOrEqual(2)
})

// test('error whan the string has not a splitter', () => {
//   const string1 = 'test'
//   const splitter = getSplitter(string1, ['/'])
//   const items = getItems(string1, splitter)
//   expect(items.length).toBeGreaterThanOrEqual(2)
// })
