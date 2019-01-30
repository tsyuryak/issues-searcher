import { appName } from '../config'
import { put, take, all, fork, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
export const moduleName = 'paginator'
const prefix = `${appName}/${moduleName}`

export const PAGINATOR_VALUES_INIT = `${prefix}/PAGINATOR_VALUES_INIT`
export const TO_FIRST_PAGE = `${prefix}/TO_FIRST_PAGE`
export const TO_NEXT_PAGE = `${prefix}/TO_NEXT_PAGE`
export const TO_PREV_PAGE = `${prefix}/TO_PREV_PAGE`
export const TO_LAST_PAGE = `${prefix}/TO_LAST_PAGE`
export const TO_PAGE_BY_NUM = `${prefix}/TO_PAGE_BY_NUM`
export const TO_URL = `${prefix}/TO_URL`

export const ReducerRecord = Record({
  baseUrl: '',
  activePage: 1,
  quantity: 0,
  maxLimit: 0,
  perPage: 30,
})

export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case PAGINATOR_VALUES_INIT:
      return state.merge(action.params)
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]
export const baseUrlSelector = createSelector(
  stateSelector,
  state => state.baseUrl
)
export const activePageSelector = createSelector(
  stateSelector,
  state => state.activePage
)
export const quantitySelector = createSelector(
  stateSelector,
  state => state.quantity
)
export const maxLimitSelector = createSelector(
  stateSelector,
  state => state.maxLimit
)
export const perPagePageSelector = createSelector(
  stateSelector,
  state => state.perPage
)
export const paginatorViewContentSelector = createSelector(
  activePageSelector,
  quantitySelector,
  maxLimitSelector,
  (activePage, quantity, maxLimit) => {
    const getArray = (start, end, limit) => {
      const resArr = []
      for (let i = start; i < end; i++) {
        resArr.push(i)
      }
      return resArr.filter(item => item <= limit)
    }

    let startVal = 1
    if (activePage >= quantity) {
      startVal =
        quantity % 2 !== 0
          ? activePage - Math.floor(quantity / 2)
          : activePage - quantity / 2 + 1
      return getArray(startVal, quantity + startVal, maxLimit)
    }

    return getArray(startVal, quantity + 1, maxLimit)
  }
)

//AC
export const init = params => ({
  type: PAGINATOR_VALUES_INIT,
  params,
})
export const toFirstPage = () => ({
  type: TO_FIRST_PAGE,
})
export const toLastPage = () => ({
  type: TO_LAST_PAGE,
})
export const toPageByNum = num => ({
  type: TO_PAGE_BY_NUM,
  num,
})
export const toPrevPage = () => ({
  type: TO_PREV_PAGE,
})
export const toNextPage = () => ({
  type: TO_NEXT_PAGE,
})
export const toURL = url => ({
  type: TO_URL,
  url,
})
export function* goToPageSaga() {
  while (true) {
    const action = yield take([
      TO_FIRST_PAGE,
      TO_LAST_PAGE,
      TO_PAGE_BY_NUM,
      TO_PREV_PAGE,
      TO_NEXT_PAGE,
      TO_URL,
    ])
    let url = null
    const { baseUrl, perPage, maxLimit, activePage } = yield all({
      baseUrl: select(baseUrlSelector),
      perPage: select(perPagePageSelector),
      maxLimit: select(maxLimitSelector),
      activePage: select(activePageSelector),
    })

    switch (action.type) {
      case TO_FIRST_PAGE:
        url = `${baseUrl}/${perPage}/1`
        break
      case TO_LAST_PAGE:
        url = `${baseUrl}/${perPage}/${maxLimit}`
        break
      case TO_PAGE_BY_NUM:
        url = `${baseUrl}/${perPage}/${action.num}`
        break
      case TO_PREV_PAGE:
        url = `${baseUrl}/${perPage}/${activePage - 1}`
        break
      case TO_NEXT_PAGE:
        url = `${baseUrl}/${perPage}/${activePage + 1}`
        break
      case TO_URL:
        url = action.url
        break
      default:
        url = '404'
        break
    }

    yield fork(toURLSaga, url)
  }
}

export function* toURLSaga(url) {
  yield put(push(url))
}

export function* saga() {
  yield all([goToPageSaga()])
}
