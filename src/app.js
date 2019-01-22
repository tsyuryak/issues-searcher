import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchField from './components/search-field/search-field'
import IssuesPage from './pages/issues-page'
import SingleIssuePage from './pages/single-issue-page'
import Status404 from './pages/status404-page'
import HomePage from './pages/home-page'
import styles from './styles/app.module.css'

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
