import Paginator from '.'

test('range without limit', () => {
  const pagesQuantity = 10
  const limit = 0
  const paginator = new Paginator(pagesQuantity, limit)
  expect(paginator.getViews()).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
})

test('range with limit', () => {
  const pagesQuantity = 10
  const limit = 3
  const paginator = new Paginator(pagesQuantity, limit)
  expect(paginator.getViews()).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [8, 9, 10],
  ])
})

test('if pagesQuantity === limit', () => {
  const pagesQuantity = 10
  const limit = 5
  const paginator = new Paginator(pagesQuantity, limit)
  expect(paginator.getViews()).toEqual([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
  expect(paginator.getCurrentView()).toEqual([1, 2, 3, 4, 5])
})

test('if pagesQuantity < limit', () => {
  const pagesQuantity = 3
  const limit = 5
  const paginator = new Paginator(pagesQuantity, limit)
  expect(paginator.getViews()).toEqual([[1, 2, 3]])
})

test('next', () => {
  const pagesQuantity = 10
  const limit = 3
  const paginator = new Paginator(pagesQuantity, limit)
  expect(paginator.getCurrentPage()).toBe(0)
  expect(paginator.next()).toEqual([4, 5, 6])
  expect(paginator.next()).toEqual([7, 8, 9])
  expect(paginator.next()).toEqual([8, 9, 10])
  expect(paginator.next()).toEqual([8, 9, 10])
})

test('prev', () => {
  const pagesQuantity = 10
  const limit = 3
  const paginator = new Paginator(pagesQuantity, limit)
  paginator.setCurrentPage(3)
  expect(paginator.getCurrentPage()).toBe(3)
  expect(paginator.prev()).toEqual([7, 8, 9])
  expect(paginator.prev()).toEqual([4, 5, 6])
  expect(paginator.prev()).toEqual([1, 2, 3])
  expect(paginator.prev()).toEqual([1, 2, 3])
})
