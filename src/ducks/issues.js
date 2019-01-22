import { appName, axiosInst, baseURL } from '../config'
import { Record } from 'immutable'
import { takeLatest, call, put, select, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'
import { getLastPage } from './issues.utils'

export const moduleName = 'issues'
const prefix = `${appName}/${moduleName}`

export const FETCH_ISSUES_REQUEST = `${prefix}/FETCH_ISSUES_REQUEST`
export const FETCH_ISSUES_SUCCESS = `${prefix}/FETCH_ISSUES_SUCCESS`
export const GO_TO_ISSUE_PAGE = `${prefix}/GO_TO_ISSUE_PAGE`
export const ISSUES_ERROR = `${prefix}/ISSUES_ERROR`

export const ReducerRecord = Record({
  loading: false,
  issues: [],
  lastPage: 0,
  owner: '',
  repo: '',
  itemsQuantity: 0,
  page: 0,
  error: null,
})
export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return state
        .set('loading', true)
        .set('owner', action.params.owner)
        .set('repo', action.params.repo)
        .set('itemsQuantity', action.params.itemsQuantity)
        .set('page', action.params.page)
        .set('error', null)
    case FETCH_ISSUES_SUCCESS:
      return state
        .set('loading', false)
        .set('issues', action.payload.issues)
        .set('lastPage', action.payload.lastPage)
    case ISSUES_ERROR:
      return state.set('error', action.error)
    default:
      return state
  }
}

//Selectors

export const stateSelector = state => state[moduleName]

export const ownerSelector = createSelector(
  stateSelector,
  state => state.owner
)

export const repoSelector = createSelector(
  stateSelector,
  state => state.repo
)

export const itemsQuantitySelector = createSelector(
  stateSelector,
  state => state.itemsQuantity
)

export const pageSelector = createSelector(
  stateSelector,
  state => state.page
)

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const issuesSelector = createSelector(
  stateSelector,
  state => state.issues
)

export const lastPageSelector = createSelector(
  stateSelector,
  state => state.lastPage
)

//AC

export const fetchIssues = params => ({
  type: FETCH_ISSUES_REQUEST,
  params,
})

export const setFetchSuccess = (data, lastPage) => ({
  type: FETCH_ISSUES_SUCCESS,
  payload: {
    issues: data,
    lastPage,
  },
})

export const goToIssuePage = url => ({
  type: GO_TO_ISSUE_PAGE,
  url,
})

//SAGAS
export function* fetchIssuesSaga() {
  const { owner, repo, page, itemsQuantity } = yield all({
    owner: select(ownerSelector),
    repo: select(repoSelector),
    itemsQuantity: select(itemsQuantitySelector),
    page: select(pageSelector),
  })
  const reqUrl = `repos/${owner}/${repo}/issues?per_page=${itemsQuantity}&page=${page}`
  try {
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    const lastPage = getLastPage(req.headers.link)
    if (req.data.length === 0) {
      throw Error('no incoming data')
    }
    yield put(setFetchSuccess(req.data, lastPage))
  } catch (error) {
    yield all([
      put({
        type: ISSUES_ERROR,
        error,
      }),
      put(push('/404')),
    ])
  }
}

export function* goToIssuePageSaga(action) {
  const { url } = action
  const issueUrl = url.replace(baseURL, '')
  yield put(push(issueUrl))
}

export function* saga() {
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga)
  yield takeLatest(GO_TO_ISSUE_PAGE, goToIssuePageSaga)
}
