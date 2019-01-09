import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SearchField from './search-field'

export const actions = {
  onSearchIssues: action('onSearchIssues'),
  onSearchRepoes: action('onSearchRepoes'),
}

storiesOf('Search Field', module).add('default', () => (
  <SearchField {...actions} />
))
