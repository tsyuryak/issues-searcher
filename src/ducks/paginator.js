import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { getViews } from './util/paginator'
export const moduleName = 'paginator'
const prefix = `${appName}/${moduleName}`

export const CREATE_PAGINATOR_VIEWS = `${prefix}/CREATE_PAGINATOR_VIEWS`
export const CHANGE_VIEW = `${prefix}/CHANGE_VIEW`

export const ReducerRecord = Record({
  currentPage: 0,
  lastPage: 0,
  limitItems: 10,
  currentViewNumber: 0,
})

export default function reducer(state = ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_PAGINATOR_VIEWS:
      return state
        .set('lastPage', payload.lastPage)
        .set('limitItems', payload.limitItems)
    case CHANGE_VIEW:
      return state.get('currentViewNumber')
    default:
      return state
  }
}

//Selectors
export const stateSelector = state => state[moduleName]
export const currentViewNumberSelector = createSelector(
  stateSelector,
  state => state.currentViewNumber
)
export const viewsSelector = createSelector(
  stateSelector,
  state => getViews(state.lastPage, state.limitItems)
)
export const currentViewSelector = createSelector(
  viewsSelector,
  currentViewNumberSelector,
  (views, number) => views[number]
)

//AC
export const createViews = (limitItems, lastPage) => ({
  type: CREATE_PAGINATOR_VIEWS,
  payload: { limitItems, lastPage },
})

