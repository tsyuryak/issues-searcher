import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadableVisibility from 'react-loadable-visibility/loadable-components'
import styles from './styles/app.module.css'

const SearchField = loadableVisibility(() =>
  import('./components/search-field/search-field')
)
const IssuesPage = loadableVisibility(() => import('./pages/issues-page'))
const SingleIssuePage = loadableVisibility(() =>
  import('./pages/single-issue-page')
)
const Status404 = loadableVisibility(() => import('./pages/status404-page'))
const HomePage = loadableVisibility(() => import('./pages/home-page'))

function App() {
  return (
    <div className={styles['app']}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          render={() => (
            <>
              <SearchField />
              <Switch>
                <Route
                  path="/issues/:owner/:repo/:perpage(\d+)/:page(\d+)"
                  component={IssuesPage}
                />
                <Route
                  path="/repos/:owner/:repo/issues/:id(\d+)"
                  component={SingleIssuePage}
                />
                <Route path="/404" component={Status404} />
              </Switch>
            </>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
