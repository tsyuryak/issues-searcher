import { select, put, call } from 'redux-saga/effects'
import { expectSaga, testSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { axiosInst } from '../config'

import reducer, {
  changeInputText,
  changeDropdownActiveItem,
  CHANGED_INPUT_TEXT,
  CHANGED_DROPDOWN_ACTIVE_ITEM,
  changeActiveDropdownItemSaga,
  searchRepoesSaga,
  searchRepoesRequestSaga,
  handleInputSaga,
  SET_OWNER,
  SET_REPO,
  SEARCH_REPOES_REQUEST,
  SEARCH_REPOES_SUCCESS,
  REDIRECT_TO_ISSUES,
  setOwner,
  ownerSelector,
  setRepo,
  SET_ACTIVE_DROPDOWN_ITEM,
  setActiveDropdownItem,
  setActiveDropdownItemSaga,
  activeItemSelector,
  redirectToIssues,
  redirectToIssuesSaga,
  REDIRECT_ERROR,
} from './search-field'
import {
  getOwnerFromText,
  startRequest,
  getTextAfterOwner,
} from './search-field.utils'
import { Record } from 'immutable'
import { push } from 'connected-react-router'

describe('SEARCH FIELD', () => {
  //AC TESTS
  describe('ACTIONS TESTS', () => {
    test('should create an action to redirect to the repo issues', () => {
      const testAction = {
        type: REDIRECT_TO_ISSUES,
        payload: {
          repo: 'repo',
          issuesQuantity: 30,
          page: 1,
        },
      }
      expect(redirectToIssues('repo', 30, 1)).toEqual(testAction)
    })
    test('should create an action to change text', () => {
      const text = 'some test text'
      const testAction = {
        type: CHANGED_INPUT_TEXT,
        text,
      }
      expect(changeInputText(text)).toEqual(testAction)
    })
    test('should create an action to set an owner', () => {
      const owner = 'owner'
      const testAction = {
        type: SET_OWNER,
        owner,
      }
      expect(setOwner(owner)).toEqual(testAction)
    })
    test('should create an action to set an repo', () => {
      const repo = 'repo'
      const testAction = {
        type: SET_REPO,
        repo,
      }
      expect(setRepo(repo)).toEqual(testAction)
    })
    test('should create an action to set an active dropdown item', () => {
      const item = { num: 1, name: 'repo' }
      const testAction = {
        type: SET_ACTIVE_DROPDOWN_ITEM,
        item,
      }
      expect(setActiveDropdownItem(item)).toEqual(testAction)
    })
  })

  //SAGAS TESTS

  describe('SAGAS TESTS', () => {
    test('should redirect to the issues pages', () => {
      const url = `/issues/owner/repo/30/1`
      return expectSaga(redirectToIssuesSaga, redirectToIssues('repo', 30, 1))
        .provide([[select(ownerSelector), 'owner']])
        .put(push(url))
        .run()
    })

    test('the redirect should has a valid owner', () => {
      return expectSaga(redirectToIssuesSaga, redirectToIssues('repo', 30, 1))
        .provide([[select(ownerSelector), '']])
        .put({
          type: REDIRECT_ERROR,
          error: 'should has an owner',
        })
        .run()
    })

    test('should be the throttle before switch a dropdown item to active', () => {
      const saga = testSaga(changeActiveDropdownItemSaga)
      saga
        .next()
        .throttleEffect(
          50,
          CHANGED_DROPDOWN_ACTIVE_ITEM,
          setActiveDropdownItemSaga
        )
        .next()
        .isDone()
    })

    test('should add an owner and a repo to the input text store', () => {
      const item = { num: 1, name: 'repo' }
      const testAction = changeDropdownActiveItem(item)

      return expectSaga(setActiveDropdownItemSaga, testAction)
        .put(setActiveDropdownItem(item))
        .provide({
          select({ selector }, next) {
            if (selector === ownerSelector) {
              return 'owner'
            }

            if (selector === activeItemSelector) {
              return item
            }

            return next()
          },
        })
        .put(changeInputText('owner repo'))
        .run()
    })

    test('should be the throttle before input text', () => {
      const saga = testSaga(searchRepoesSaga)
      saga
        .next()
        .throttleEffect(200, CHANGED_INPUT_TEXT, handleInputSaga)
        .next()
        .isDone()
    })

    describe('handle input', () => {
      test('set owner from input text', () => {
        const inputText = 'test-text'
        const testAction = changeInputText(inputText)
        const gen = testSaga(handleInputSaga, testAction)
        gen
          .next(ownerSelector)
          .select(ownerSelector)
          .next()
          .put({ type: SET_OWNER, owner: inputText })
          .next()
          .isDone()
        //Integration test
        return expectSaga(handleInputSaga, testAction)
          .provide([[select(ownerSelector), '']])
          .put(setOwner(inputText))
          .run()
      })

      test('an owner have an empty value if input text length <= 1', () => {
        const inputText = 't'
        const testAction = changeInputText(inputText)
        const gen = testSaga(handleInputSaga, testAction)
        gen
          .next(ownerSelector)
          .select(ownerSelector)
          .next()
          .put(setOwner(''))
          .next()
          .isDone()

        //Integration test
        return expectSaga(handleInputSaga, testAction)
          .provide([[select(ownerSelector), '']])
          .put(setOwner(''))
          .run()
      })

      //Перереписать
      test('start repo request if input text has space or a slash', () => {
        let inputText = 'ow1 '
        const testAction = changeInputText(inputText)
        let gen = testSaga(handleInputSaga, testAction)
        gen
          .next(ownerSelector)
          .select(ownerSelector)
          .next('ow1')
          .fork(searchRepoesRequestSaga, 'ow1')
          .next()
          .isDone()

        inputText = 'ow1/'
        gen = testSaga(handleInputSaga, testAction)
        gen
          .next(ownerSelector)
          .select(ownerSelector)
          .next('ow1')
          .fork(searchRepoesRequestSaga, 'ow1')
          .next()
          .isDone()

        //Integrated test
        return expectSaga(handleInputSaga, testAction)
          .provide([[select(ownerSelector), 'ow1']])
          .fork(searchRepoesRequestSaga, 'ow1')
          .run()
      })

      test('should create the API call', () => {
        const fetchedData = {
          data: [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' },
            { id: 3, name: 'repo3' },
          ],
        }

        return expectSaga(searchRepoesRequestSaga, 'owner')
          .provide([[matchers.call.fn(axiosInst.get), fetchedData]])
          .put({ type: SEARCH_REPOES_REQUEST })
          .put({
            type: SEARCH_REPOES_SUCCESS,
            repoes: [
              { id: 1, name: 'repo1' },
              { id: 2, name: 'repo2' },
              { id: 3, name: 'repo3' },
            ],
          })
          .run()
      })
    })
  })

  //REDUCER TESTS

  describe('REDUCER TESTS', () => {
    test('should return the initial state', () => {
      const testRecord = Record({
        text: '',
        owner: '',
        loading: false,
        repoes: [],
        error: null,
        currentRepo: '',
        activeItem: {
          num: 0,
          name: '',
        },
        issuesQuantity: 30,
        page: 1,
        repo: '',
      })
      const testReducer = reducer(undefined, {})
      expect(testReducer.toObject()).toEqual(testRecord().toObject())
    })
  })
})

describe('owner', () => {
  test('can contain a dash symbol', () => {
    const owner = 'valid-owner-test'
    expect(getOwnerFromText(owner)).toBeTruthy()
  })
  test('can contain _ symbols', () => {
    const owner = 'valid_owner-test'
    expect(getOwnerFromText(owner)).toBeTruthy()
  })
  test('a first symbol only letter', () => {
    const owner = '1nvalid'
    expect(getOwnerFromText(owner)).toBeFalsy()
  })
  test('can contain only letters, digits, dashes', () => {
    const owner = 'n1valid-2tst-text'
    expect(getOwnerFromText(owner)).toBeTruthy()
  })
  test('cant contain any non-word symbols', () => {
    const owner = 'n1val*id-2/tst-t.ext'
    expect(getOwnerFromText(owner)).toBeFalsy()
  })
  test('owner length >= 2', () => {
    const owner = 'd3'
    expect(getOwnerFromText(owner)).toBeTruthy()
  })
})

test('text after owner with space separator', () => {
  const owner = 'owner'
  const testString = 'owner xxxxx'
  expect(getTextAfterOwner(testString, owner)).toBe('xxxxx')
})

test('text after owner with / separator', () => {
  const owner = 'owner'
  const testString = 'owner/ xxxxx'
  expect(getTextAfterOwner(testString, owner)).toBe('xxxxx')
})

describe('repo request', () => {
  test('start when has space', () => {
    const text = 'valid-owner-test '
    expect(startRequest(text)).toBeTruthy()
  })
  test('start when has a slash', () => {
    const text = 'valid-owner-test/'
    expect(startRequest(text)).toBeTruthy()
  })
})

/*import {
  getOwnerFromQuery,
  queryItemIsValid,
  getTextAfterOwner,
} from './search-field.utils'

describe('has separator', () => {
  test('has owner if separator is /', () => {
    expect(getOwnerFromQuery('owner/')).toBe('owner')
  })
  test('has owner if separator is space', () => {
    expect(getOwnerFromQuery('owner ')).toBe('owner')
  })
})

test('null if epmpty query', () => {
  expect(getOwnerFromQuery('')).toBeNull()
})

test('null if query is undefined', () => {
  expect(getOwnerFromQuery(undefined)).toBeNull()
})

test('null if first character not letter', () => {
  expect(getOwnerFromQuery('1owner')).toBeNull()
})

test('valid item', () => {
  expect(queryItemIsValid('valid')).toBeTruthy()
})

test('1nvalid item', () => {
  expect(queryItemIsValid('1nvalid')).toBeFalsy()
})

*/
