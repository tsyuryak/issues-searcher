import { all } from 'redux-saga/effects'
import { saga as issuesSaga } from '../ducks/issues'

export default function*() {
  yield all([issuesSaga()])
}
