import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SearchField from './search-field'

export const actions = {
  onSearchIssues: action('onSearchIssues'),
  onSearchRepoes: action('onSearchRepoes'),
}

export const createDropDownList = itemsQuantity => {
  const arr = []
  for (let i = 1; i <= itemsQuantity; i++) {
    arr.push({ id: i, name: `repo-${i}-${Math.floor(Math.random() * 1000)}` })
  }

  return arr
}

export const params1 = {
  loading: false,
  loaded: false,
  owner: '',
  repoes: [],
}

storiesOf('Search Field', module)
  .add('default', () => <SearchField {...actions} {...params1} />)
  .add('loading repo', () => (
    <SearchField {...actions} {...params1} loading={true} owner={'owner'} />
  ))
  .add('repo loaded', () => (
    <SearchField
      {...actions}
      {...params1}
      loaded={true}
      owner={'owner'}
      repoes={createDropDownList(10)}
    />
  ))
