import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import issuesReducer, { moduleName as issuesModule } from '../ducks/issues'

export default history =>
  combineReducers({
    router: connectRouter(history),
    [issuesModule]: issuesReducer,
  })
