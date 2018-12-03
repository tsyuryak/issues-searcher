import { appName, axiosInst } from '../config'
import { Record, List } from 'immutable'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createSelector } from 'reselect'

export const moduleName = 'repo'
const prefix = `${appName}/${moduleName}`

export const FETCH_REPOS_REQUEST = `${prefix}/FETCH_REPOS_REQUEST`
export const FETCH_REPOS_SUCCESS = `${prefix}/FETCH_REPOS_SUCCESS`
export const FETCH_REPOS_FAIL = `${prefix}/FETCH_REPOS_FAIL`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  repos: [],
})

export default function reducer(state = ReducerRecord(), action) {
  const { repos } = action
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return state.set('loading', true).set('loaded', false)
    case FETCH_REPOS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('repos', repos)
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]
export const reposSelector = createSelector(
  stateSelector,
  state => state.repos
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
export const fetchRepos = owner => ({
  type: FETCH_REPOS_REQUEST,
  owner,
})

//SAGAS
export function* fetchReposSaga(action) {
  const { owner } = action
  const reqUrl = `users/${owner}/repos`
  try {
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    yield put({
      type: FETCH_REPOS_SUCCESS,
      repos: List(req.data),
    })
  } catch (error) {}
}

export function* saga() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchReposSaga)
}
