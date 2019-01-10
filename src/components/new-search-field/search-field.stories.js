import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { initialState } from './dropdown-list.stories'
import { withRedux } from '../../../.storybook/decorators'

import SearchField from './search-field'

export const actions = {
  onSearchIssues: action('onSearchIssues'),
  onSearchRepoes: action('onSearchRepoes'),
  onGotoRepo: action('onGotoRepo'),
}

export const createDropDownList = itemsQuantity => {
  const arr = []
  for (let i = 1; i <= itemsQuantity; i++) {
    arr.push({ id: i, name: `repo-${i}-${Math.floor(Math.random() * 1000)}` })
  }

  return arr
}

storiesOf('Search Field', module)
  .addDecorator(withRedux(initialState, []))
  .add('default', () => <SearchField />)

storiesOf('Search Field', module)
  .addDecorator(
    withRedux({ ...initialState, loading: true, owner: 'owner' }, [])
  )
  .add('loading repo', () => <SearchField />)

storiesOf('Search Field', module)
  .addDecorator(
    withRedux(
      {
        ...initialState,
        loaded: true,
        owner: 'owner',
        visible: true,
        repoes: createDropDownList(10),
      },
      []
    )
  )
  .add('repo loaded', () => <SearchField />)
