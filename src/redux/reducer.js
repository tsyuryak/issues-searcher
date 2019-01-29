import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import issuesReducer, { moduleName as issuesModule } from '../ducks/issues'
import singleIssueReducer, {
  moduleName as singleIssueModule,
} from '../ducks/single-issue'
import searchFieldReducer, {
  moduleName as searchFieldModule,
} from '../ducks/search-field'
import paginatorReducer, {
  moduleName as paginatorModeule,
} from '../ducks/paginator'

export default history =>
  combineReducers({
    router: connectRouter(history),
    [issuesModule]: issuesReducer,
    [singleIssueModule]: singleIssueReducer,
    [searchFieldModule]: searchFieldReducer,
    [paginatorModeule]: paginatorReducer,
  })
