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
  maxLimitSelector,
  activePageSelector,
  toURLSaga,
  TO_LAST_PAGE,
  TO_PAGE_BY_NUM,
  TO_PREV_PAGE,
  TO_NEXT_PAGE,
  TO_URL,
  toLastPage,
  toPageByNum,
  toNextPage,
  toPrevPage,
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
    .take([
      TO_FIRST_PAGE,
      TO_LAST_PAGE,
      TO_PAGE_BY_NUM,
      TO_PREV_PAGE,
      TO_NEXT_PAGE,
      TO_URL,
    ])

  saga
    .next(toFirstPage())
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })
    .next({
      baseUrl: 'issues/owner/repo',
      perPage: 30,
    })
    .fork(toURLSaga, 'issues/owner/repo/30/1')
    .next()

  saga
    .next(toLastPage())
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })
    .next({
      baseUrl: 'issues/owner/repo',
      perPage: 30,
      maxLimit: 20,
    })
    .fork(toURLSaga, 'issues/owner/repo/30/20')
    .next()

  saga
    .next(toPageByNum(10))
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })
    .next({
      baseUrl: 'issues/owner/repo',
      perPage: 30,
      activePage: 10,
      maxLimit: 30,
    })
    .fork(toURLSaga, 'issues/owner/repo/30/10')
    .next()

  saga
    .next(toNextPage())
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })
    .next({
      baseUrl: 'issues/owner/repo',
      perPage: 30,
      activePage: 2,
      maxLimit: 30,
    })
    .fork(toURLSaga, 'issues/owner/repo/30/3')
    .next()

  saga
    .next(toPrevPage())
    .all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })
    .next({
      baseUrl: 'issues/owner/repo',
      perPage: 30,
      activePage: 2,
      maxLimit: 30,
    })
    .fork(toURLSaga, 'issues/owner/repo/30/1')
    .next()
})
