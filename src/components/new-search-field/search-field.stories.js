import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SearchField from './search-field'

export const actions = {
  onSearchIssues: action('onSearchIssues'),
  onSearchRepoes: action('onSearchRepoes'),
}

export const params1 = {
  loading: false,
  loaded: false,
  owner: '',
}

storiesOf('Search Field', module)
  .add('default', () => <SearchField {...actions} {...params1} />)
  .add('loading repo', () => (
    <SearchField {...actions} {...params1} loading={true} owner={'owner'} />
  ))
  .add('repo loaded', () => (
    <SearchField {...actions} {...params1} loading={false} owner={'owner'} />
  ))
