import React, { Component } from 'react'
import { getOwnerFromQuery } from './utils'
import PropTypes from 'prop-types'
import styles from './search-field.module.css'

export class SearchField extends Component {
  state = {
    inputText: this.props.owner,
  }

  setInputText = e => {
    const text = e.target.value
    this.searchRepo(text)
    this.setState({ inputText: text })
  }

  searchRepo = query => {
    const owner = getOwnerFromQuery(query)
    if (!owner) return
    this.props.onSearchRepoes(owner)
  }

  onHandleSubmit = e => {
    e.preventDefault()
    const { inputText } = this.state
    this.props.onSearchIssues(inputText)
  }

  getSearchButtonState = () => {
    const { loading } = this.props
    const text = !loading ? 'Search' : 'Loading repo...'
    const disabled = !this.state.inputText.trim() || loading
    return {
      text,
      disabled,
    }
  }

  render() {
    const buttonState = this.getSearchButtonState()
    return (
      <div className={styles['search-field']}>
        <form onSubmit={e => this.onHandleSubmit(e)}>
          <ul>
            <li>
              <input
                type="search"
                onChange={e => this.setInputText(e)}
                value={this.state.inputText}
              />
            </li>
            <li>
              <input
                type="submit"
                disabled={buttonState.disabled}
                value={buttonState.text}
              />
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

SearchField.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  owner: PropTypes.string,
  onSearchIssues: PropTypes.func.isRequired,
  onSearchRepoes: PropTypes.func.isRequired,
}

export default SearchField
