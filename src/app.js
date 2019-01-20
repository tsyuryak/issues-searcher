import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import IssuesPage from './pages/issues-page'
//import SingleIssuePage from './pages/single-issue-page'
//import Status404 from './pages/status404-page'
import HomePage from './pages/home-page'
import styles from './styles/app.module.css'

function App() {
  return (
    <div className={styles['app']}>
      <Route path="/" component={HomePage} />
    </div>
  )
}

export default App
/* 

<Switch>
        <Route
          path="/repos/:owner/:repo/issues/:id"
          component={SingleIssuePage}
        />
        <Route
          path="/issues/:owner/:repo/:perpage/:page"
          component={IssuesPage}
        />
        <Route path="/issues/:owner/:repo" component={IssuesPage} />
        <Route path="/404" component={Status404} />
        <Route path="/" component={HomePage} />
      </Switch>

*/
