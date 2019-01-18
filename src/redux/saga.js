import { all } from 'redux-saga/effects'
import { saga as issuesSaga } from '../ducks/issues'
import { saga as singleIssueSaga } from '../ducks/single-issue'
import { saga as reposSaga } from '../ducks/repos'
import { saga as searchFieldSaga } from '../ducks/search-field'

export default function*() {
  yield all([issuesSaga(), singleIssueSaga(), reposSaga(), searchFieldSaga()])
}
