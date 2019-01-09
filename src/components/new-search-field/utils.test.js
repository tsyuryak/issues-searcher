import { getOwnerFromQuery, queryItemIsValid } from './utils'

describe('has separator', () => {
  test('has owner if separator is /', () => {
    expect(getOwnerFromQuery('owner/')).toBe('owner')
  })
  test('has owner if separator is space', () => {
    expect(getOwnerFromQuery('owner ')).toBe('owner')
  })
})

test('null if epmpty query', () => {
  expect(getOwnerFromQuery('')).toBeNull()
})

test('null if first character not letter', () => {
  expect(getOwnerFromQuery('1owner')).toBeNull()
})

test('valid item', () => {
  expect(queryItemIsValid('valid')).toBeTruthy()
})

test('1nvalid item', () => {
  expect(queryItemIsValid('1nvalid')).toBeFalsy()
})
