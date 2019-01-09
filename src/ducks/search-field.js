import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'

export const moduleName = 'search-field'
const prefix = `${appName}/${moduleName}`

export const SEARCH_ISSUES = `${prefix}/SEARCH_ISSUES`
export const SEARCH_REPOES = `${prefix}/SEARCH_REPOES`
export const GO_TO_REPO = `${prefix}/GO_TO_REPO`
export const RESET_ACTIVE_ITEM = `${prefix}/RESET_ACTIVE_ITEM`
export const SET_ACTIVE_ITEM = `${prefix}/SET_ACTIVE_ITEM`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  visible: false,
  owner: '',
  repoes: [],
  typedValue: '',
  activeItem: -1,
})

export default function reducer(state = ReducerRecord(), action) {
  return state
}

//Selectors
export const stateSelector = state => state[moduleName]

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
)

export const visibleSelector = createSelector(
  stateSelector,
  state => state.visible
)

export const ownerSelector = createSelector(
  stateSelector,
  state => state.owner
)

export const repoesSelector = createSelector(
  stateSelector,
  state => state.repoes
)

export const typedValueSelector = createSelector(
  stateSelector,
  state => state.typedValue
)

export const activeItemSelector = createSelector(
  stateSelector,
  state => state.activeItem
)

/* 
  onSearchIssues: PropTypes.func.isRequired,
  onSearchRepoes: PropTypes.func.isRequired,
  onGotoRepo: PropTypes.func.isRequired,
*/

/*
  ---dropdown---
  resetActiveItem: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  setListLength: PropTypes.func.isRequired,
*/
