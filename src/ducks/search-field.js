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
  race,
} from 'redux-saga/effects'
import {
  isQueryResulsIsValid,
  parseQueryText,
  readySearchRepo,
} from './search-field.utils'

export const moduleName = 'search-field'
const prefix = `${appName}/${moduleName}`

//Constants

export const SET_QUERY_RESULT = `${prefix}/SET_QUERY_RESULT`
export const CHANGED_INPUT_TEXT = `${prefix}/CHANGED_INPUT_TEXT`
export const FECTH_REPOES_SUCCESS = `${prefix}/FECTH_REPOES_SUCCESS`
export const FETCH_REPOES_REQUEST = `${prefix}/FETCH_REPOES_REQUEST`
export const SEARCH_FIELD_ERROR = `${prefix}/SEARCH_FIELD_ERROR`
export const CHANGED_DROPDOWN_ACTIVE_ITEM = `${prefix}/CHANGED_DROPDOWN_ACTIVE_ITEM`
export const GOTO_TO_ISSUES = `${prefix}/GOTO_TO_ISSUES`
export const HIDE_DROPDOWN = `${prefix}/HIDE_DROPDOWN`

//Reducer
export const ReducerRecord = Record({
  inputText: '',
  owner: '',
  repo: '',
  repoes: [],
  loading: false,
  itemId: 0,
  error: null,
})

export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case CHANGED_INPUT_TEXT:
      return state.set('inputText', action.text)
    case SET_QUERY_RESULT:
      return state
        .set('owner', action.payload.owner)
        .set('repo', action.payload.repo)
    case FECTH_REPOES_SUCCESS:
      return state.set('repoes', action.repoes).set('loading', false)
    case FETCH_REPOES_REQUEST:
      return state.set('loading', true)
    case CHANGED_DROPDOWN_ACTIVE_ITEM:
      return state
        .set('itemId', action.item.itemId)
        .set('repo', action.item.name)
    case SEARCH_FIELD_ERROR:
      return state.set('error', action.error)
    case HIDE_DROPDOWN:
      return state.set('repoes', [])
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]

export const inputTextSelector = createSelector(
  stateSelector,
  state => state.inputText
)

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const repoSelector = createSelector(
  stateSelector,
  state => state.repo
)

export const repoesSelector = createSelector(
  stateSelector,
  state => state.repoes
)

export const ownerSelector = createSelector(
  stateSelector,
  state => state.owner
)

export const activeItemIdSelector = createSelector(
  stateSelector,
  state => state.itemId
)

export const activeItemSelector = createSelector(
  activeItemIdSelector,
  repoSelector,
  (id, repo) => ({ id, repo })
)

export const visibleSelector = createSelector(
  ownerSelector,
  loadingSelector,
  repoesSelector,
  (owner, loading, repoes) => !!owner && !loading && repoes.length > 0
)

//AC

export const hideDropdown = () => ({
  type: HIDE_DROPDOWN,
})

export const changeInputText = text => ({
  type: CHANGED_INPUT_TEXT,
  text,
})

export const setQueryResult = (owner, repo) => ({
  type: SET_QUERY_RESULT,
  payload: {
    owner,
    repo,
  },
})

export const fetchRepoSuccess = repoes => ({
  type: FECTH_REPOES_SUCCESS,
  repoes,
})

export const changeDropdownActiveItem = ({ itemId, name }) => ({
  type: CHANGED_DROPDOWN_ACTIVE_ITEM,
  item: {
    itemId,
    name,
  },
})

export const goToIssues = (quantityOnPage = 30, page = 1) => ({
  type: GOTO_TO_ISSUES,
  payload: { quantityOnPage, page },
})

//Sagas
export function* goToIssuesSaga(action) {
  const { page, quantityOnPage } = action.payload

  const { owner, repo } = yield all({
    owner: select(ownerSelector),
    repo: select(repoSelector),
  })
  if (!owner || !repo) {
    yield put({
      type: SEARCH_FIELD_ERROR,
      error: 'should has an owner and an repo',
    })
  } else {
    const url = `/issues/${owner}/${repo}/${quantityOnPage}/${page}`
    yield put(push(url))
  }
}

export function* changeDropdownActiveItemSaga() {
  yield throttle(50, CHANGED_DROPDOWN_ACTIVE_ITEM, setDropdownActiveItemSaga)
}

export function* setDropdownActiveItemSaga() {
  const inputText = yield select(inputTextSelector)
  const { owner, repo } = yield all({
    owner: select(ownerSelector),
    repo: select(repoSelector),
  })
  if (owner && repo) {
    const text = inputText.includes('/')
      ? `${owner}/${repo}`
      : `${owner} ${repo}`
    yield put(changeInputText(text))
  }
}

export function* searchRepoesSaga() {
  yield throttle(200, CHANGED_INPUT_TEXT, handleInputSaga)
}

export function* handleInputSaga() {
  const text = yield select(inputTextSelector)
  const results = parseQueryText(text)
  if (isQueryResulsIsValid(results)) {
    yield put(setQueryResult(results.owner, results.repo))
    const { owner, repo } = yield all({
      owner: select(ownerSelector),
      repo: select(repoSelector),
    })
    if (owner.length > 0 && repo.length === 0 && readySearchRepo(text)) {
      yield fork(fetchRepoesSaga)
    }
  }
}

export function* fetchRepoesSaga() {
  try {
    const owner = yield select(ownerSelector)
    const reqUrl = `users/${owner}/repos`
    yield put({ type: FETCH_REPOES_REQUEST })
    const req = yield call([axiosInst, axiosInst.get], reqUrl)
    const repoes = req.data.map(repo => ({ id: repo.id, name: repo.name }))
    yield put(fetchRepoSuccess(repoes))
  } catch (error) {
    yield put({
      type: SEARCH_FIELD_ERROR,
      error,
    })
  }
}

export function* saga() {
  yield all([
    race([searchRepoesSaga(), changeDropdownActiveItemSaga()]),
    takeLatest(GOTO_TO_ISSUES, goToIssuesSaga),
  ])
}
