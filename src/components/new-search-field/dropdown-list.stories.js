import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DropdownList from './dropdown-list'

export const params1 = {
  visible: false,
}

storiesOf('Search Field > dropdown', module).add('default', () => (
  <DropdownList {...params1} />
))
