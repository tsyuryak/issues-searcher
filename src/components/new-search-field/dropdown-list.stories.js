import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { createDropDownList } from './search-field.stories'
import DropdownList from './dropdown-list'

export const params1 = {
  visible: false,
  repoes: createDropDownList(10),
  owner: '',
  activeItem: -1,
}

export const actions = {
  onGoToRepo: action('onGoToRepo'),
}

storiesOf('Search Field > dropdown', module)
  .add('default - invisible', () => <DropdownList {...params1} {...actions} />)
  .add('repo list - visible', () => (
    <DropdownList {...params1} visible={true} {...actions} owner="owner" />
  ))
  .add('repo list - active item #2', () => (
    <DropdownList
      {...params1}
      visible={true}
      activeItem={1}
      {...actions}
      owner="owner"
    />
  ))
  .add('repo list - active item #5', () => (
    <DropdownList
      {...params1}
      activeItem={4}
      visible={true}
      {...actions}
      owner="owner"
    />
  ))
  .add('repo list - unactive', () => (
    <DropdownList {...params1} visible={true} {...actions} owner="owner" />
  ))
