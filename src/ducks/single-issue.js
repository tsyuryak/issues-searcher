import { appName, axiosInst, baseURL } from '../config'
import { takeLatest, call, put } from 'redux-saga/effects'
import { Record, List } from 'immutable'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'

export const moduleName = 'single-issue'
const prefix = `${appName}/${moduleName}`

export const REDIRECT_TO_SINGLE_ISSUE = `${prefix}/REDIRECT_TO_SINGLE_ISSUE`
export const SINGLE_ISSUE_REQUEST = `${prefix}/SINGLE_ISSUE_REQUEST`
export const SINGLE_ISSUE_SUCCESS = `${prefix}/SINGLE_ISSUE_SUCCESS`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  issue: {},
  user: {},
})

export default function reducer(state = ReducerRecord(), action) {
  const { issue, user } = action

  switch (action.type) {
    case SINGLE_ISSUE_REQUEST:
      return state.set('loading', true).set('loaded', false)
    case SINGLE_ISSUE_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('issue', issue)
        .set('user', user)
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
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
)

//AC
export const redirectToIssue = url => ({
  type: REDIRECT_TO_SINGLE_ISSUE,
  url,
})

export const fetchIssue = url => ({ type: SINGLE_ISSUE_REQUEST, url })

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
    console.log(req)
    yield put({
      type: SINGLE_ISSUE_SUCCESS,
      issue: req.data,
      user: req.data.user,
    })
  } catch (error) {}
}

export function* saga() {
  yield takeLatest(REDIRECT_TO_SINGLE_ISSUE, redirectToIssueSaga)
  yield takeLatest(SINGLE_ISSUE_REQUEST, fetchIssueSaga)
}
