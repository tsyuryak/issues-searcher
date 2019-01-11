import { appName, axiosInst } from '../config'
import { Record, List } from 'immutable'
import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'
import { getLastPage } from './issues.utils'

export const moduleName = 'issues'
const prefix = `${appName}/${moduleName}`

export const REDIRECT_TO_ISSUES = `${prefix}/REDIRECT_TO_ISSUES`
export const FETCH_ISSUES_REQUEST = `${prefix}/FETCH_ISSUES_REQUEST`
export const FETCH_ISSUES_SUCCESS = `${prefix}/FETCH_ISSUES_SUCCESS`
export const GO_TO_PAGE = `${prefix}/GO_TO_PAGE`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  issues: List([]),
  lastPage: 0,
  currentBaseUrl: '',
})

export default function reducer(state = ReducerRecord(), action) {
  const { issues, lastPage, currentBaseUrl } = action
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return state.set('loading', true).set('loaded', false)
    case FETCH_ISSUES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('issues', issues)
        .set('lastPage', lastPage)
        .set('currentBaseUrl', currentBaseUrl)
    default:
      return state
  }
}

//Selectors

export const stateSelector = state => state[moduleName]
export const currentBasuUrlSelector = createSelector(
  stateSelector,
  state => state.currentBaseUrl
)
export const issuesSelector = createSelector(
  stateSelector,
  state => state.issues
)
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
)
export const ownerSelector = createSelector(
  stateSelector,
  state => state.currentOwner
)
export const repoSelector = createSelector(
  stateSelector,
  state => state.currentRepo
)
export const lastPageSelector = createSelector(
  stateSelector,
  state => state.lastPage
)
export const currentPageSelector = createSelector(
  stateSelector,
  state => state.currentPage
)
export const currentQuerySelector = createSelector(
  ownerSelector,
  repoSelector,
  (owner, repo) => (!owner && !repo ? '' : `${owner}/${repo}`)
)

//AC

export const redirectToIssues = (owner, repo, perPage = 30, page = 1) => ({
  type: REDIRECT_TO_ISSUES,
  payload: { owner, repo, perPage, page },
})

export const fetchIssues = (owner, repo, perPage, page) => ({
  type: FETCH_ISSUES_REQUEST,
  payload: { owner, repo, page, perPage },
})

export const goToPage = url => ({
  type: GO_TO_PAGE,
  url,
})

//SAGAS

export function* goToPageSaga(action) {
  const { url } = action
  yield put(push(url))
}

export function* redirectToIssuesSaga(action) {
  const { owner, repo, perPage, page } = action.payload
  const url = `/issues/${owner}/${repo}/${perPage}/${page}`
  yield put(push(url))
}

export function* fetchIssuesSaga(action) {
  const { owner, repo, page, perPage } = action.payload
  const reqUrl = `repos/${owner}/${repo}/issues?per_page=${perPage}&page=${page}`
  try {
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    const lastPage = getLastPage(req.headers.link)
    if (req.data.length === 0) {
      throw Error()
    }
    yield put({
      type: FETCH_ISSUES_SUCCESS,
      issues: req.data,
      lastPage,
      currentBaseUrl: `/issues/${owner}/${repo}/${perPage}`,
    })
  } catch (error) {
    yield put(push('/404'))
  }
}

export function* saga() {
  yield takeLatest(GO_TO_PAGE, goToPageSaga)
  yield takeLatest(REDIRECT_TO_ISSUES, redirectToIssuesSaga)
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga)
}
