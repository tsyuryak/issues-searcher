import { testSaga } from 'redux-saga-test-plan'
import { push } from 'connected-react-router'
import { select, put } from 'redux-saga/effects'
import {
  fetchIssues,
  FETCH_ISSUES_REQUEST,
  fetchIssuesSaga,
  ownerSelector,
  repoSelector,
  itemsQuantitySelector,
  pageSelector,
  setFetchSuccess,
  FETCH_ISSUES_SUCCESS,
  ISSUES_ERROR,
  goToIssuePage,
  GO_TO_ISSUE_PAGE,
  goToIssuePageSaga,
  paginatorRequest,
  PAGINATOR_REQUEST,
  paginatorRequestSaga,
} from './issues'
import { getLastPage } from './issues.utils'
import { axiosInst } from '../config'
import { issues as externalData } from '../mock/issues'

describe('fetch issues', () => {
  test('should create an action when get params', () => {
    expect(
      fetchIssues({ owner: 'owner', repo: 'repo', itemsQuantity: 30, page: 1 })
    ).toEqual({
      type: FETCH_ISSUES_REQUEST,
      params: { owner: 'owner', repo: 'repo', itemsQuantity: 30, page: 1 },
    })
  })
  test('should create an action when fecth success', () => {
    expect(setFetchSuccess([1, 2, 3, 4, 5], 18)).toEqual({
      type: FETCH_ISSUES_SUCCESS,
      payload: { issues: [1, 2, 3, 4, 5], lastPage: 18 },
    })
  })
  test('should fetch repo issues', () => {
    const req = {
      headers: {
        link:
          `<https://api.github.com/repositories/23088740/issues?page=2>;` +
          ` rel="next", <https://api.github.com/repositories/23088740/issues?page=18>; rel="last"`,
      },
      data: externalData,
    }

    testSaga(fetchIssuesSaga)
      .next()
      .all({
        owner: select(ownerSelector),
        repo: select(repoSelector),
        itemsQuantity: select(itemsQuantitySelector),
        page: select(pageSelector),
      })
      .next({ owner: 'owner', repo: 'repo', itemsQuantity: 30, page: 1 })
      .call(
        [axiosInst, axiosInst.get],
        `repos/owner/repo/issues?per_page=30&page=1`
      )
      .next(req)
      .put(setFetchSuccess(req.data, 18))
      .next()
      .isDone()
  })

  test('should redirect to 404 page if no issues', () => {
    const req = {
      headers: {
        link:
          `<https://api.github.com/repositories/23088740/issues?page=2>;` +
          ` rel="next", <https://api.github.com/repositories/23088740/issues?page=18>; rel="last"`,
      },
      data: [],
    }

    testSaga(fetchIssuesSaga)
      .next()
      .all({
        owner: select(ownerSelector),
        repo: select(repoSelector),
        itemsQuantity: select(itemsQuantitySelector),
        page: select(pageSelector),
      })
      .next({ owner: 'owner', repo: 'repo', itemsQuantity: 30, page: 1 })
      .call(
        [axiosInst, axiosInst.get],
        `repos/owner/repo/issues?per_page=30&page=1`
      )
      .next(req)
      .all([
        put({ type: ISSUES_ERROR, error: Error('no incoming data') }),
        put(push('/404')),
      ])
      .next()
      .isDone()
  })
})

describe('get last page', () => {
  //https://developer.github.com/v3/guides/traversing-with-pagination/
  test('should return 18 if page=1 in this case', () => {
    const link =
      `<https://api.github.com/repositories/23088740/issues?page=2>;` +
      ` rel="next", <https://api.github.com/repositories/23088740/issues?page=18>; rel="last"`

    expect(getLastPage(link)).toBe(18)
  })

  test('should return 1 if no data in this case', () => {
    const link = undefined
    expect(getLastPage(link)).toBe(1)
  })

  test('should return 18 if page=18 in this case', () => {
    const link =
      `<https://api.github.com/repositories/23088740/issues?per_page=30&page=17>;` +
      ` rel="prev", <https://api.github.com/repositories/23088740/issues?per_page=30&page=1>; rel="first"    `
    expect(getLastPage(link)).toBe(18)
  })
})

describe('go to single issue', () => {
  test('should create an action', () => {
    const url = 'https://api.github.com/repos/axios/axios/issues/1970'
    expect(goToIssuePage(url)).toEqual({
      type: GO_TO_ISSUE_PAGE,
      url: 'https://api.github.com/repos/axios/axios/issues/1970',
    })
  })
  test('should redirect ot the issue page', () => {
    const url = 'https://api.github.com/repos/axios/axios/issues/1970'
    testSaga(goToIssuePageSaga, goToIssuePage(url))
      .next()
      .put(push('/repos/axios/axios/issues/1970'))
      .next()
      .isDone()
  })
})

describe('paginator', () => {
  const url = '/test/link'
  test('should create an pagnator', () => {
    expect(paginatorRequest(url)).toEqual({
      type: PAGINATOR_REQUEST,
      url,
    })
  })
  test('go to page', () => {
    testSaga(paginatorRequestSaga, paginatorRequest(url))
      .next()
      .put(push(url))
  })
})
