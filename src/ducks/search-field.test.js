import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { axiosInst } from '../config'

import {
  CHANGED_INPUT_TEXT,
  changeInputText,
  searchRepoesSaga,
  handleInputSaga,
  SET_QUERY_RESULT,
  setQueryResult,
  ownerSelector,
  repoSelector,
  fetchRepoSuccess,
  fetchRepoesSaga,
  inputTextSelector,
  FECTH_REPOES_SUCCESS,
  FETCH_REPOES_REQUEST,
  CHANGED_DROPDOWN_ACTIVE_ITEM,
  changeDropdownActiveItem,
  setDropdownActiveItemSaga,
} from './search-field'

import {
  parseQueryText,
  isQueryResulsIsValid,
  readySearchRepo,
} from './search-field.utils'

test('should create an action when text changed', () => {
  const text = 'changed text'
  expect(changeInputText(text)).toEqual({
    type: CHANGED_INPUT_TEXT,
    text,
  })
})

test('should has the throttle for an input handler', () => {
  const saga = testSaga(searchRepoesSaga)
  saga
    .next()
    .throttleEffect(200, CHANGED_INPUT_TEXT, handleInputSaga)
    .next()
    .isDone()
})

describe('entered text', () => {
  test('"owner repo" => one space', () => {
    const testText = 'owner repo'
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: 'repo',
    })
  })

  test('"owner  repo" => two or more space between words', () => {
    const testText = 'owner  repo'
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: 'repo',
    })
  })

  test('"owner/repo"', () => {
    const testText = 'owner/repo'
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: 'repo',
    })
  })

  test('"owner/ repo"', () => {
    const testText = 'owner/ repo'
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: 'repo',
    })
  })

  test('"owner"', () => {
    const testText = 'owner'
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: '',
    })
  })

  test('"owner " => one space', () => {
    const testText = 'owner '
    expect(parseQueryText(testText)).toEqual({
      owner: 'owner',
      repo: '',
    })
  })

  test('" owner" => first char is space', () => {
    const testText = ' owner'
    expect(parseQueryText(testText)).toEqual({ owner: 'owner', repo: '' })
  })
})

test('should create an action to add an owner and a repo value', () => {
  const args = {
    owner: 'owner',
    repo: 'repo',
  }
  expect(setQueryResult(args.owner, args.repo)).toEqual({
    type: SET_QUERY_RESULT,
    payload: { owner: 'owner', repo: 'repo' },
  })
})

test('should creacte an action when text input', () => {
  expect(changeInputText('owner repo')).toEqual({
    type: CHANGED_INPUT_TEXT,
    text: 'owner repo',
  })
})

test('should creacte an action when fetch success', () => {
  expect(
    fetchRepoSuccess([
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
      { id: 3, name: 'name3' },
    ])
  ).toEqual({
    type: FECTH_REPOES_SUCCESS,
    repoes: [
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
      { id: 3, name: 'name3' },
    ],
  })
})

describe('query validation', () => {
  test('{owner: "owner", repo: "" } => is valid', () => {
    expect(isQueryResulsIsValid({ owner: 'owner', repo: '' })).toBeTruthy()
  })
  test('{owner: "1owner", repo: "1owner" } => is invalid', () => {
    expect(
      isQueryResulsIsValid({ owner: '1owner', repo: '1owner' })
    ).toBeFalsy()
  })
  test('{owner: "owner1-owner", repo: "owner1-owner" } => is invalid', () => {
    expect(
      isQueryResulsIsValid({ owner: 'owner1-owner', repo: 'owner1-owner' })
    ).toBeTruthy()
  })
  test('{owner: "-owner1-owner", repo: "-owner1-owner" } => is invalid', () => {
    expect(
      isQueryResulsIsValid({ owner: '-owner1-owner', repo: '-owner1-owner' })
    ).toBeFalsy()
  })
  test('{owner: "owner1-owner-", repo: "owner1-owner-" } => is invalid', () => {
    expect(
      isQueryResulsIsValid({ owner: 'owner1-owner-', repo: 'owner1-owner-' })
    ).toBeFalsy()
  })
  test('{owner: "owner1*owner", repo: "owner1*owner" } => is invalid', () => {
    expect(
      isQueryResulsIsValid({ owner: 'owner1*owner', repo: 'owner1*owner' })
    ).toBeFalsy()
  })
  test('{owner: "owner1_owner", repo: "owner1-owner" } => is valid', () => {
    expect(
      isQueryResulsIsValid({ owner: 'owner1_owner', repo: 'owner1-owner' })
    ).toBeTruthy()
  })
})

describe('should ready to search repoes list', () => {
  test('owner/', () => {
    const text = 'owner/'
    expect(readySearchRepo(text)).toBeTruthy()
  })
  test('owner ', () => {
    const text = 'owner '
    expect(readySearchRepo(text)).toBeTruthy()
  })
})

describe('handleInputSaga has only an owner with space splitter', () => {
  test('unit test', () => {
    const saga = testSaga(handleInputSaga, changeInputText('owner '))
    saga
      .next()
      .put(changeInputText('owner '))
      .next()
      .select(inputTextSelector)
      .next('owner ')
      .put(setQueryResult('owner', ''))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('')
      .fork(fetchRepoesSaga)
      .next()
      .isDone()
  })
  test('integration test', async () => {
    await expectSaga(handleInputSaga, changeInputText('owner '))
      .put(changeInputText('owner '))
      .provide([
        [select(inputTextSelector), 'owner '],
        [select(ownerSelector), 'owner'],
        [select(repoSelector), ''],
      ])
      .put(setQueryResult('owner', ''))
      .fork(fetchRepoesSaga)
      .run()
  })
})

describe('handleInputSaga has only an owner with "/" splitter', () => {
  test('unit test', () => {
    const saga = testSaga(handleInputSaga, changeInputText('owner/'))
    saga
      .next()
      .put(changeInputText('owner/'))
      .next()
      .select(inputTextSelector)
      .next('owner/')
      .put(setQueryResult('owner', ''))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('')
      .fork(fetchRepoesSaga)
      .next()
      .isDone()
  })
  test('integration test', async () => {
    await expectSaga(handleInputSaga, changeInputText('owner/'))
      .provide([
        [select(inputTextSelector), 'owner/'],
        [select(ownerSelector), 'owner'],
        [select(repoSelector), ''],
      ])
      .put(setQueryResult('owner', ''))
      .fork(fetchRepoesSaga)
      .run()
  })
})

describe('handleInputSaga has an owner and a repo', () => {
  test('unit test', () => {
    const saga = testSaga(handleInputSaga, changeInputText('owner repo'))
    saga
      .next()
      .put(changeInputText('owner repo'))
      .next()
      .select(inputTextSelector)
      .next('owner repo')
      .put(setQueryResult('owner', 'repo'))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('repo')
      .isDone()
  })

  test('integration test', async () => {
    await expectSaga(handleInputSaga, changeInputText('owner repo'))
      .provide([
        [select(inputTextSelector), 'owner repo'],
        [select(ownerSelector), 'owner'],
        [select(repoSelector), 'repo'],
      ])
      .put(setQueryResult('owner', 'repo'))
      .run()
  })
})

describe('fetch repoes', () => {
  const fetchedData = {
    data: [
      { id: 1, name: 'name1', something: 'xxxxx' },
      { id: 2, name: 'name2', something: 'yyyyy' },
      { id: 3, name: 'name3', something: 'zzzzz' },
    ],
  }

  const arr = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
  ]
  const url = `users/owner/repos`
  test('should fetch a repoes array - unit test', () => {
    const saga = testSaga(fetchRepoesSaga)
    saga
      .next()
      .select(ownerSelector)
      .next('owner')
      .put({ type: FETCH_REPOES_REQUEST })
      .next()
      .call([axiosInst, axiosInst.get], url)
      .next(fetchedData)
      .put(fetchRepoSuccess(arr))
      .next()
      .isDone()
  })

  test('err if data === undefined - unit test', () => {
    const saga = testSaga(fetchRepoesSaga)
    saga
      .next()
      .select(ownerSelector)
      .next('owner')
      .put({ type: FETCH_REPOES_REQUEST })
      .next()
      .call([axiosInst, axiosInst.get], url)
      .next(undefined)
      .finish() //if throw
      .isDone()
  })
})

test('should create an action when an active item changed', () => {
  const action = {
    type: CHANGED_DROPDOWN_ACTIVE_ITEM,
    item: { itemId: 1, name: 'repo' },
  }
  expect(changeDropdownActiveItem({ itemId: 1, name: 'repo' })).toEqual(action)
})

describe('setDropdownActiveItemSaga', () => {
  test('1', () => {
    const obj = { itemId: 1, name: 'repo' }
    const saga = testSaga(
      setDropdownActiveItemSaga,
      changeDropdownActiveItem({ itemId: 1, name: 'repo' })
    )
    saga
      .next()
      .put(changeDropdownActiveItem(obj))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('repo')
      .select(inputTextSelector)
      .next('owner and_some_text')
      .put(changeInputText('owner repo'))
      .next()
      .isDone()
  })

  test('2', () => {
    const obj = { itemId: 0, name: '' }
    const saga = testSaga(
      setDropdownActiveItemSaga,
      changeDropdownActiveItem({ itemId: 0, name: '' })
    )
    saga
      .next()
      .put(changeDropdownActiveItem(obj))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('')
      .select(inputTextSelector)
      .next()
      .isDone()
  })

  test('3', () => {
    const obj = { itemId: 1, name: 'repo' }
    const saga = testSaga(
      setDropdownActiveItemSaga,
      changeDropdownActiveItem({ itemId: 1, name: 'repo' })
    )
    saga
      .next()
      .put(changeDropdownActiveItem(obj))
      .next()
      .select(ownerSelector)
      .next('owner')
      .select(repoSelector)
      .next('repo')
      .select(inputTextSelector)
      .next('owner/and_some_text')
      .put(changeInputText('owner/repo'))
      .next()
      .isDone()
  })
})
