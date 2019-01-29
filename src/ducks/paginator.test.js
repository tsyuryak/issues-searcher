import { testSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import {
  PAGINATOR_VALUES_INIT,
  TO_FIRST_PAGE,
  goToPageSaga,
  init,
  toFirstPage,
  baseUrlSelector,
  perPagePageSelector,
  toFirstPageSaga,
} from './paginator'

test('should create init action', () => {
  const params = {
    baseUrl: 'issues/owner/repo',
    quantity: 6,
    activePage: 1,
    maxLimit: 20,
    perPage: 30,
  }
  expect(init(params)).toEqual({
    type: PAGINATOR_VALUES_INIT,
    params,
  })
})

test('should create toFirstPage action', () => {
  expect(toFirstPage()).toEqual({ type: TO_FIRST_PAGE })
})

test('2', () => {
  const saga = testSaga(goToPageSaga)
    .next()
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
    })
    .next({ baseUrl: 'issues/owner/repo', perPage: 30 })

  saga
    .take(TO_FIRST_PAGE)
    .next()
    .fork(toFirstPageSaga, { baseUrl: 'issues/owner/repo', perPage: 30 })
    .next()
    .isDone()
})
