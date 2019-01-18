import { appName, axiosInst } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { push } from 'connected-react-router'
import {
  put,
  takeLatest,
  call,
  fork,
  throttle,
  select,
  all,
} from 'redux-saga/effects'
import {
  getTextAfterOwner,
  startRequest,
  getOwnerFromText,
} from './search-field.utils'

export const moduleName = 'search-field'
const prefix = `${appName}/${moduleName}`

export const CHANGED_INPUT_TEXT = `${prefix}/CHANGED_INPUT_TEXT`
export const SET_OWNER = `${prefix}/SET_OWNER`
export const SEARCH_REPOES_REQUEST = `${prefix}/SEARCH_REPOES_REQUEST`
export const SEARCH_REPOES_SUCCESS = `${prefix}/SEARCH_REPOES_SUCCESS`
export const SEARCH_REPOES_ERROR = `${prefix}/SEARCH_REPOES_ERROR`
export const SET_REPO = `${prefix}/SET_REPO`
export const SET_ACTIVE_DROPDOWN_ITEM = `${prefix}/SET_ACTIVE_DROPDOWN_ITEM`
export const CHANGED_DROPDOWN_ACTIVE_ITEM = `${prefix}/CHANGED_DROPDOWN_ACTIVE_ITEM`
export const HIDE_DROPDOWN_REQUEST = `${prefix}/HIDE_DROPDOWN_REQUEST`
export const REDIRECT_TO_ISSUES = `${prefix}/REDIRECT_TO_ISSUES`
export const REDIRECT_ERROR = `${prefix}/REDIRECT_ERROR`

export const ReducerRecord = Record({
  text: '',
  owner: '',
  loading: false,
  repoes: [],
  error: null,
  currentRepo: '',
  activeItem: {
    num: 0,
    name: '',
  },
  issuesQuantity: 30,
  page: 1,
  repo: '',
})

export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case CHANGED_INPUT_TEXT:
      return state.set('text', action.text)
    case SET_OWNER:
      return state.set('owner', action.owner).set('repoes', [])
    case SEARCH_REPOES_REQUEST:
      return state.set('loading', true).set('error', null)
    case SEARCH_REPOES_SUCCESS:
      return state.set('loading', false).set('repoes', action.repoes)
    case SEARCH_REPOES_ERROR:
    case REDIRECT_ERROR:
      return state.set('error', action.error).set('loading', false)
    case SET_ACTIVE_DROPDOWN_ITEM:
      return state.set('activeItem', action.item)
    case HIDE_DROPDOWN_REQUEST:
      return state.set('repoes', [])
    case REDIRECT_TO_ISSUES:
      return state
        .set('repo', action.repo)
        .set('issuesQuantity', action.issuesQuantity)
        .set('page', action.page)
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const repoesSelector = createSelector(
  stateSelector,
  state => state.repoes
)

export const inputTextSelector = createSelector(
  stateSelector,
  state => state.text
)

export const activeItemSelector = createSelector(
  stateSelector,
  state => state.activeItem
)

export const queryTextSelector = createSelector(
  inputTextSelector,
  activeItemSelector,
  (inputText, repo) => inputText + repo.name
)

export const ownerSelector = createSelector(
  stateSelector,
  state => state.owner
)

export const textAfterOwnerSelector = createSelector(
  inputTextSelector,
  ownerSelector,
  (inputText, owner) => getTextAfterOwner(inputText, owner)
)

export const visibleSelector = createSelector(
  ownerSelector,
  loadingSelector,
  repoesSelector,
  (owner, loading, repoes) => !!owner && !loading && repoes.length > 0
)

//AC
export const changeInputText = text => ({
  type: CHANGED_INPUT_TEXT,
  text,
})

export const setOwner = owner => ({
  type: SET_OWNER,
  owner,
})

export const setRepo = repo => ({
  type: SET_REPO,
  repo,
})

export const changeDropdownActiveItem = item => ({
  type: CHANGED_DROPDOWN_ACTIVE_ITEM,
  item,
})

export const setActiveDropdownItem = item => ({
  type: SET_ACTIVE_DROPDOWN_ITEM,
  item,
})

export const hideDropdown = () => ({
  type: HIDE_DROPDOWN_REQUEST,
})

export const redirectToIssues = (repo, issuesQuantity = 30, page = 1) => ({
  type: REDIRECT_TO_ISSUES,
  payload: { repo, issuesQuantity, page },
})

//Sagas
export function* redirectToIssuesSaga(action) {
  const { repo, page, issuesQuantity } = action.payload
  const owner = yield select(ownerSelector)
  if (!owner) {
    yield put({
      type: REDIRECT_ERROR,
      error: 'should has an owner',
    })
  } else {
    const url = `/issues/${owner}/${repo}/${issuesQuantity}/${page}`
    yield put(push(url))
  }
}

export function* changeActiveDropdownItemSaga() {
  yield throttle(50, CHANGED_DROPDOWN_ACTIVE_ITEM, setActiveDropdownItemSaga)
}

export function* setActiveDropdownItemSaga(action) {
  const { item } = action
  yield put(setActiveDropdownItem(item))
  const owner = yield select(ownerSelector)
  const repo = yield select(activeItemSelector)
  if (owner && repo.num > 0) {
    yield put(changeInputText(`${owner} ${repo.name}`))
  }
}

export function* searchRepoesSaga() {
  yield throttle(200, CHANGED_INPUT_TEXT, handleInputSaga)
}

export function* handleInputSaga(input) {
  const { text } = input

  const owner = yield select(ownerSelector)
  if (text.length < 2) {
    yield put(setOwner(''))
  } else if (getOwnerFromText(text)) {
    yield put(setOwner(text))
  } else if (owner && startRequest(text)) {
    yield fork(searchRepoesRequestSaga, owner)
  }
}

export function* searchRepoesRequestSaga(owner) {
  yield put({ type: SEARCH_REPOES_REQUEST })
  const reqUrl = `users/${owner}/repos`
  try {
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    yield put({
      type: SEARCH_REPOES_SUCCESS,
      repoes: req.data.map(repo => ({ id: repo.id, name: repo.name })),
    })
  } catch (error) {
    yield put({
      type: SEARCH_REPOES_ERROR,
      error,
    })
  }
}

export function* saga() {
  yield all([
    searchRepoesSaga(),
    takeLatest(REDIRECT_TO_ISSUES, redirectToIssuesSaga),
    changeActiveDropdownItemSaga(),
  ])
}
