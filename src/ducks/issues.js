import { appName, axiosInst } from '../config'
import { Record, List } from 'immutable'
import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'
import Paginator from './func/paginator'

export const moduleName = 'issues'
const prefix = `${appName}/${moduleName}`

export const REDIRECT_TO_ISSUES = `${prefix}/REDIRECT_TO_ISSUES`
export const FETCH_ISSUES_REQUEST = `${prefix}/FETCH_ISSUES_REQUEST`
export const FETCH_ISSUES_SUCCESS = `${prefix}/FETCH_ISSUES_SUCCESS`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  paginator: {},
  issues: List([]),
  currentOwner: null,
  currentRepo: null,
})

export default function reducer(state = ReducerRecord(), action) {
  const { issues, owner, repo, paginator } = action
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return state.set('loading', true).set('loaded', false)
    case FETCH_ISSUES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('issues', issues)
        .set('paginator', paginator)
        .set('currentOwner', owner)
        .set('currentRepo', repo)
    default:
      return state
  }
}

//Selectors

export const stateSelector = state => state[moduleName]
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
export const paginatorSelector = createSelector(
  stateSelector,
  state => state.paginator
)
export const ownerSelector = createSelector(
  stateSelector,
  state => state.currentOwner
)
export const repoSelector = createSelector(
  stateSelector,
  state => state.currentRepo
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

//SAGAS

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

    if (req.data.length === 0) {
      throw Error()
    }

    const paginator = new Paginator(req.headers.link)
    yield put({
      type: FETCH_ISSUES_SUCCESS,
      issues: req.data,
      owner,
      repo,
      paginator: {
        hasPages: paginator.hasPages(),
        maxPage: paginator.maxPage(),
        perPage,
        page,
        url: `/issues/${owner}/${repo}`,
      },
    })
  } catch (error) {
    yield put(push('/404'))
  }
}

export function* saga() {
  yield takeLatest(REDIRECT_TO_ISSUES, redirectToIssuesSaga)
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga)
}
