import React, { Component } from 'react'
import { connect } from 'react-redux'
import ValidInput from './valid-input'
import DropdownList from './dropdown-list'
import styles from './styles/search-field.module.css'
import { redirectToIssues } from '../../ducks/issues'
import { fetchRepos, reposSelector, loadedSelector } from '../../ducks/repos'
import { getItems, getSplitter } from './func/search-field-func'

class SearchField extends Component {
  state = {
    inputText: '',
    errorMessage: '',
    dropdown: false,
    owner: '',
  }

  componentDidMount() {
    window.addEventListener('click', this.setDropdownFalse)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.setDropdownFalse)
  }

  setDropdownFalse = () => this.setState({ dropdown: false })

  handleSubmit = e => {
    e.preventDefault()
    const data = this.getData(this.state.inputText)
    if (data) {
      this.setState({ errorMessage: '', dropdown: false })
      this.props.redirectToIssues(data.owner, data.repo)
    } else {
      this.setState({ errorMessage: `wrong request: ${this.state.inputText}` })
    }
  }

  setText = text => {
    this.setState({ inputText: text })
  }

  onKeyPressHandler = keyCode => {
    if ([32, 111, 191].includes(keyCode)) {
      const last = this.state.inputText.slice(-1)
      const owner = this.state.inputText.split(last)[0].trim()
      if (owner) {
        this.props.fetchRepos(owner)
        this.setState({ dropdown: true, owner })
      }
    }
  }

  getData = string => {
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
    this.setState({ inputText: `${owner}/${repo}` })
  }

  render() {
    const events = {
      onKeyPressHandler: this.onKeyPressHandler,
      onInputText: this.setText,
    }
    return (
      <div className={styles['search-field']}>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <ValidInput
                events={events}
                error={this.state.errorMessage}
                value={this.state.inputText}
              />
              {this.state.dropdown && this.props.repoLoaded && (
                <DropdownList
                  className={styles['repo-list']}
                  repos={this.props.repos}
                  onClickHandler={this.onClickHandler}
                />
              )}
            </li>
            <li>
              <input type="submit" disabled={!this.state.inputText} />
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
  { redirectToIssues, fetchRepos }
)(SearchField)
