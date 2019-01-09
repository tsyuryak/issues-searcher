import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import issuesReducer, { moduleName as issuesModule } from '../ducks/issues'
import singleIssueReducer, {
  moduleName as singleIssueModule,
} from '../ducks/single-issue'
import reposReducer, { moduleName as reposModule } from '../ducks/repos'
import searchFieldReducer, {
  moduleName as searchFieldModule,
} from '../ducks/search-field'

export default history =>
  combineReducers({
    router: connectRouter(history),
    [issuesModule]: issuesReducer,
    [singleIssueModule]: singleIssueReducer,
    [reposModule]: reposReducer,
    [searchFieldModule]: searchFieldReducer,
  })
