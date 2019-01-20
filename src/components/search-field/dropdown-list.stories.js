import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'
import { createDropDownList } from './search-field.stories'
import DropdownList from './dropdown-list'

export const actions = {
  onGoToRepo: action('onGoToRepo'),
  resetActiveItem: action('resetActiveItem'),
  setActiveItem: action('setActiveItem'),
  setListLength: action('setListLength'),
}
export const initialState = {
  loading: false,
  visible: false,
  repoes: [],
  typedValue: '',
  owner: 'owner',
  activeItem: -1,
}

storiesOf('Search Field/Dropdown', module)
  .addDecorator(withRedux({}, []))
  .add('with states', () => <DropdownList />)
