import { all } from 'redux-saga/effects'
import { saga as issuesSaga } from '../ducks/issues'
import { saga as singleIssueSaga } from '../ducks/single-issue'
import { saga as reposSaga } from '../ducks/repos'

export default function*() {
  yield all([issuesSaga(), singleIssueSaga(), reposSaga()])
}
