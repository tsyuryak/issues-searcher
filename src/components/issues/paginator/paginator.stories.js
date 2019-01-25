import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Paginator from './paginator'

export const params1 = {
  baseUrl: 'http://yandex.ru',
  activePage: 1,
  quantity: 10,
  maxLimit: 10,
  nextLinkText: 'Next',
  prevLinkText: 'Prev',
  firstLinkText: 'First',
  lastLinkText: 'Last',
}

export const actions = {
  onGoToPage: action('onGoToPage'),
}

storiesOf('Paginator 10 x 10', module)
  .add('page 1', () => <Paginator params={params1} {...actions} />)
  .add('page 2', () => (
    <Paginator params={{ ...params1, activePage: 2 }} {...actions} />
  ))
  .add('page 5', () => (
    <Paginator params={{ ...params1, activePage: 5 }} {...actions} />
  ))
  .add('page 10', () => (
    <Paginator params={{ ...params1, activePage: 10 }} {...actions} />
  ))

storiesOf('Paginator 3 x 10', module)
  .add('page 1', () => (
    <Paginator params={{ ...params1, quantity: 3 }} {...actions} />
  ))
  .add('page 2', () => (
    <Paginator
      params={{ ...params1, activePage: 2, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 3', () => (
    <Paginator
      params={{ ...params1, activePage: 3, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 4', () => (
    <Paginator
      params={{ ...params1, activePage: 4, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 5', () => (
    <Paginator
      params={{ ...params1, activePage: 5, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 6', () => (
    <Paginator
      params={{ ...params1, activePage: 6, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 7', () => (
    <Paginator
      params={{ ...params1, activePage: 7, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 8', () => (
    <Paginator
      params={{ ...params1, activePage: 8, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 9', () => (
    <Paginator
      params={{ ...params1, activePage: 9, quantity: 3 }}
      {...actions}
    />
  ))
  .add('page 10', () => (
    <Paginator
      params={{ ...params1, activePage: 10, quantity: 3 }}
      {...actions}
    />
  ))
