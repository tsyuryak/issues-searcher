import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchField from './components/search-field'
import IssuesPage from './routes/issues-page'
import './App.css'

function App() {
  return (
    <div>
      <SearchField />
      <Switch>
        <Route path="/issues/:owner/:repo" component={IssuesPage} />
        <Route path="/" render={() => <strong>Строка</strong>} />
      </Switch>
    </div>
  )
}

export default App
