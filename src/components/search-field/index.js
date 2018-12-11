import React, { Component } from 'react'
import { connect } from 'react-redux'
import ValidInput from './valid-input'
import DropdownList from './dropdown-list'
import styles from './styles/search-field.module.css'
import { redirectToIssues } from '../../ducks/issues'
import {
  fetchReposByOwner,
  reposSelector,
  loadedSelector,
} from '../../ducks/repos'
import { getItems, getSplitter } from './func/search-field-func'

class SearchField extends Component {
  state = {
    queryText: !!this.props.query
      ? `${this.props.query.owner}/${this.props.query.repo}`
      : '',
    hasError: false,
    dropdownReady: false,
    owner: '',
  }

  componentDidMount() {
    window.addEventListener('click', this.setDropdownFalse)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.setDropdownFalse)
  }

  setDropdownFalse = () => this.setState({ dropdownReady: false })

  handleSubmit = e => {
    e.preventDefault()
    const queryItems = this.parseQuery(this.state.queryText)
    if (queryItems && queryItems.owner && queryItems.repo) {
      this.props.redirectToIssues(queryItems.owner, queryItems.repo)
    } else {
      this.setState({
        queryText: `wrong request: ${this.state.queryText}`,
        hasError: true,
      })
    }
  }

  setQueryText = text => {
    this.setState({ queryText: text, hasError: false })
  }

  onKeyPressHandler = keyCode => {
    //key codes 32-" ", 111,191 - "/"
    if ([32, 111, 191].includes(keyCode)) {
      const last = this.state.queryText.slice(-1)
      const owner = this.state.queryText.split(last)[0].trim()
      if (owner) {
        this.props.fetchReposByOwner(owner)
        this.setState({ dropdownReady: true, owner })
      }
    }
  }

  parseQuery = string => {
    try {
      const splitter1 = /\s*\/{1,}\s*/
      const splitter2 = /\s+/
      const splitter = getSplitter(string, [splitter1, splitter2])
      const items = getItems(string, splitter)
      return {
        owner: items[0],
        repo: items[1],
      }
    } catch (error) {
      return null
    }
  }

  onClickHandler = repo => {
    const { owner } = this.state
    this.props.redirectToIssues(owner, repo)
    this.setState({ inputText: this.props.currentQuery })
  }

  render() {
    const events = {
      onKeyPressHandler: this.onKeyPressHandler,
      onInputText: this.setQueryText,
    }
    return (
      <div className={styles['search-field']}>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <ValidInput
                events={events}
                error={this.state.hasError}
                value={this.state.queryText}
              />
              {this.state.dropdownReady && this.props.repoLoaded && (
                <DropdownList
                  className={styles['repo-list']}
                  repos={this.props.repos}
                  onClickHandler={this.onClickHandler}
                />
              )}
            </li>
            <li>
              <input type="submit" disabled={!this.state.queryText.trim()} />
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({
    repoLoaded: loadedSelector(state),
    repos: reposSelector(state),
  }),
  { redirectToIssues, fetchReposByOwner }
)(SearchField)
