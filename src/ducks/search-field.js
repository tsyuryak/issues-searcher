import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { getTextAfterOwner, getOwnerFromQuery } from './search-field.utils'

export const moduleName = 'search-field'
const prefix = `${appName}/${moduleName}`

export const SET_TEST_VALUES = `${prefix}/SET_TEST_VALUES`
export const SEARCH_ISSUES = `${prefix}/SEARCH_ISSUES`
export const SEARCH_REPOES = `${prefix}/SEARCH_REPOES`
export const GO_TO_REPO = `${prefix}/GO_TO_REPO`
export const SET_ACTIVE_ITEM = `${prefix}/SET_ACTIVE_ITEM`
export const SET_INPUT_TEXT = `${prefix}/SET_INPUT_TEXT`

export const ReducerRecord = Record({
  loading: false,
  visible: false,
  text: '',
  repoes: [],
  typedValue: '',
  activeItem: -1,
})

export default function reducer(state = ReducerRecord(), action) {
  switch (action.type) {
    case SET_TEST_VALUES:
      return state
        .set('visible', action.values.visible)
        .set('repoes', action.values.repoes)
        .set('activeItem', action.values.activeItem)
        .set('typedValue', action.values.typedValue)
        .set('loading', action.values.loading)
    case SET_INPUT_TEXT:
      return state.set('text', action.text)
    case SET_ACTIVE_ITEM:
      return state.set('activeItem', action.item)
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

export const visibleSelector = createSelector(
  stateSelector,
  state => state.visible
)

export const repoesSelector = createSelector(
  stateSelector,
  state => state.repoes
)

export const loadedSelector = createSelector(
  repoesSelector,
  repoes => repoes.length > 0
)

export const inputTextSelector = createSelector(
  stateSelector,
  state => state.text
)

export const ownerSelector = createSelector(
  inputTextSelector,
  query => getOwnerFromQuery(query)
)

export const typedValueSelector = createSelector(
  inputTextSelector,
  ownerSelector,
  (inputText, owner) => getTextAfterOwner(inputText, owner)
)

export const activeItemSelector = createSelector(
  stateSelector,
  state => state.activeItem
)

export const filteredRepoSelector = createSelector(
  repoesSelector,
  typedValueSelector,
  (repoes, typedValue) => repoes.filter(r => r.name.includes(typedValue))
)

//AC

//Only for STORYBOOK_MODE = true in .env
export const setTestValues = values => ({
  type: SET_TEST_VALUES,
  values,
})

export const setActiveItem = item => ({
  type: SET_ACTIVE_ITEM,
  item,
})

export const setInputText = text => ({
  type: SET_INPUT_TEXT,
  text,
})
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
