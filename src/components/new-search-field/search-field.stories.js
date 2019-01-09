import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SearchField from './search-field'

export const actions = {
  onSearchIssues: action('onSearchIssues'),
  onSearchRepoes: action('onSearchRepoes'),
}

export const params1 = {
  loading: true,
}

storiesOf('Search Field', module)
  .add('default', () => (
    <SearchField {...actions} {...params1} loading={false} />
  ))
  .add('loading repo', () => <SearchField {...actions} {...params1} />)
