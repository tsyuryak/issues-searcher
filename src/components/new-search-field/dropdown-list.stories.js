import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { createDropDownList } from './search-field.stories'
import { withRedux } from '../../../.storybook/decorators'
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
  owner: '',
  repoes: [],
  typedValue: '',
  activeItem: -1,
}

const cannedActions = [{ name: 'Demo Action', action: { type: 'test' } }]

storiesOf('Search Field/Dropdown', module)
  .addDecorator(withRedux(initialState, []))
  .add('invisible', () => <DropdownList />)

storiesOf('Search Field/Dropdown', module)
  .addDecorator(
    withRedux(
      {
        ...initialState,
        repoes: createDropDownList(10),
        owner: 'owner',
        visible: true,
      },
      []
    )
  )
  .add('repo list - visible', () => <DropdownList />)

storiesOf('Search Field/Dropdown', module)
  .addDecorator(
    withRedux(
      {
        ...initialState,
        repoes: createDropDownList(10),
        owner: 'owner',
        activeItem: 1,
        visible: true,
      },
      []
    )
  )
  .add('repo list - active item #2', () => <DropdownList />)

storiesOf('Search Field/Dropdown', module)
  .addDecorator(
    withRedux(
      {
        ...initialState,
        repoes: createDropDownList(10),
        owner: 'owner',
        activeItem: 4,
        visible: true,
      },
      []
    )
  )
  .add('repo list - active item #5', () => <DropdownList />)

storiesOf('Search Field/Dropdown', module)
  .addDecorator(
    withRedux(
      {
        ...initialState,
        repoes: createDropDownList(22),
        owner: 'owner',
        visible: true,
        typedValue: '2',
      },
      []
    )
  )
  .add('repo list - filter by 8', () => <DropdownList />)
