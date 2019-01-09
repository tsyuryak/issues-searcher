import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'

export const moduleName = 'search-field'
const prefix = `${appName}/${moduleName}`

export const SEARCH_ISSUES = `${prefix}/SEARCH_ISSUES`
export const SEARCH_REPOES = `${prefix}/SEARCH_REPOES`
export const GO_TO_REPO = `${prefix}/GO_TO_REPO`

export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  visible: false,
  owner: '',
  repoes: [],
  typedValue: '',
  activeItem: -1,
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
