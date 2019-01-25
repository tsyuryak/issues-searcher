import {
  fetchIssue,
  SINGLE_ISSUE_REQUEST,
  fetchIssueSaga,
  setFecthIssueSuccess,
  SINGLE_ISSUE_SUCCESS,
  SINGLE_ISSUE_ERROR,
} from './single-issue'
import { axiosInst } from '../config'
import { issue as externalData } from '../mock/single-issue'
import { testSaga } from 'redux-saga-test-plan'

describe('an issue fetching', () => {
  const url = 'repos/owner/repo/issues/1234'
  test('should create the fetch issue action', () => {
    expect(fetchIssue(url)).toEqual({ type: SINGLE_ISSUE_REQUEST, url })
  })
  test('should create an action if the request successful', () => {
    expect(setFecthIssueSuccess(externalData)).toEqual({
      type: SINGLE_ISSUE_SUCCESS,
      issue: externalData,
      user: externalData.user,
    })
  })
  test('should fetch data after the request', () => {
    const req = { data: externalData }
    testSaga(fetchIssueSaga, fetchIssue(url))
      .next()
      .call([axiosInst, axiosInst.get], url)
      .next(req)
      .put(setFecthIssueSuccess(req.data))
      .next()
      .isDone()
  })
  test('should get an error', () => {
    testSaga(fetchIssueSaga, fetchIssue(url))
      .next()
      .call([axiosInst, axiosInst.get], url)
      .throw(Error('something wrong'))
      .put({
        type: SINGLE_ISSUE_ERROR,
        error: Error('something wrong'),
      })
      .next()
      .isDone()
  })
})
