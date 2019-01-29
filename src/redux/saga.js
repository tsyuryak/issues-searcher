import { all } from 'redux-saga/effects'
import { saga as issuesSaga } from '../ducks/issues'
import { saga as singleIssueSaga } from '../ducks/single-issue'
import { saga as searchFieldSaga } from '../ducks/search-field'
import { saga as paginatorSaga } from '../ducks/paginator'

export default function*() {
  yield all([
    issuesSaga(),
    singleIssueSaga(),
    searchFieldSaga(),
    paginatorSaga(),
  ])
}
