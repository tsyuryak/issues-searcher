import { appName, axiosInst, baseURL } from '../config'
import { takeLatest, call, put } from 'redux-saga/effects'
import { Record } from 'immutable'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'

export const moduleName = 'single-issue'
const prefix = `${appName}/${moduleName}`

export const REDIRECT_TO_SINGLE_ISSUE = `${prefix}/REDIRECT_TO_SINGLE_ISSUE`
export const SINGLE_ISSUE_REQUEST = `${prefix}/SINGLE_ISSUE_REQUEST`
export const SINGLE_ISSUE_SUCCESS = `${prefix}/SINGLE_ISSUE_SUCCESS`
export const SINGLE_ISSUE_ERROR = `${prefix}/SINGLE_ISSUE_ERROR`

export const ReducerRecord = Record({
  loading: false,
  issue: {},
  user: {},
  error: null,
})

export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case SINGLE_ISSUE_REQUEST:
      return state.set('loading', true).set('error', null)
    case SINGLE_ISSUE_SUCCESS:
      return state
        .set('loading', false)
        .set('issue', action.issue)
        .set('user', action.issue.user)
    case SINGLE_ISSUE_ERROR:
      return state.set('error', action.error)
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]
export const issueSelector = createSelector(
  stateSelector,
  state => state.issue
)
export const userSelector = createSelector(
  stateSelector,
  state => state.user
)
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

//AC

export const fetchIssue = url => ({ type: SINGLE_ISSUE_REQUEST, url })
export const setFecthIssueSuccess = data => ({
  type: SINGLE_ISSUE_SUCCESS,
  issue: data,
  user: data.user,
})

//Sagas
export function* redirectToIssueSaga(action) {
  const { url } = action
  const modURL = url.replace(baseURL, '')
  yield put(push(modURL))
}

export function* fetchIssueSaga(action) {
  const { url } = action
  try {
    const req = yield call([axiosInst, axiosInst.get], url)
    yield put(setFecthIssueSuccess(req.data))
  } catch (error) {
    yield put({
      type: SINGLE_ISSUE_ERROR,
      error,
    })
  }
}

export function* saga() {
  yield takeLatest(SINGLE_ISSUE_REQUEST, fetchIssueSaga)
}
