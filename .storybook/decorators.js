import React from 'react'
import addons from '@storybook/addons'
import withReduxCore from 'addon-redux/withRedux'
import store from '../src/redux'

export const withRedux = (state, actions) =>
  withReduxCore(addons)({
    store,
    state,
    actions,
  })
