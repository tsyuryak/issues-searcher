import { configure } from '@storybook/react'
import requireContext from 'require-context.macro'

import '@storybook/addon-console'

const req = requireContext('../src/components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(fn => req(fn))
}

configure(loadStories, module)
