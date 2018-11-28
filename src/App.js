import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchField from './components/search-field'
import IssuesPage from './routes/issues-page'
import SingleIssuePage from './routes/single-issue-page'
import Status404 from './routes/status404-page'
import './App.css'

function App() {
  return (
    <div>
      <SearchField />
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
        <Route path="/" render={() => <strong>Строка</strong>} />
      </Switch>
    </div>
  )
}

export default App
