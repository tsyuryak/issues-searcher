import { appName, axiosInst } from '../config'
import { Record, List } from 'immutable'
import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'

export const moduleName = 'issues'
const prefix = `${appName}/${moduleName}`

export const REDIRECT_TO_ISSUES = `${prefix}/REDIRECT_TO_ISSUES`
export const FETCH_ISSUES_REQUEST = `${prefix}/FETCH_ISSUES_REQUEST`
export const FETCH_ISSUES_SUCCESS = `${prefix}/FETCH_ISSUES_SUCCESS`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  issues: [],
})

export default function reducer(state = ReducerRecord(), action) {
  const { issues } = action
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return state.set('loading', true).set('loaded', false)
    case FETCH_ISSUES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('issues', issues)
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

//AC

export const redirectToIssues = (owner, repo) => ({
  type: REDIRECT_TO_ISSUES,
  payload: { owner, repo },
})

export const fetchIssues = (owner, repo) => ({
  type: FETCH_ISSUES_REQUEST,
  payload: { owner, repo },
})

//SAGAS

export function* redirectToIssuesSaga(action) {
  const { owner, repo } = action.payload
  const url = `/issues/${owner}/${repo}`
  yield put(push(url))
}

export function* fetchIssuesSaga(action) {
  const { owner, repo } = action.payload
  const reqUrl = `repos/${owner}/${repo}/issues`
  try {
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    yield put({
      type: FETCH_ISSUES_SUCCESS,
      issues: List(req.data),
    })
  } catch (error) {}
}

export function* saga() {
  yield takeLatest(REDIRECT_TO_ISSUES, redirectToIssuesSaga)
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga)
}
