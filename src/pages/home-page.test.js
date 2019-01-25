import React from 'react'
import { create } from 'react-test-renderer'
import HomePage from './home-page'

test('snapshot', () => {
  const c = create(<HomePage />)
  expect(c.toJSON()).toMatchSnapshot()
})
