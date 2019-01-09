import React, { Component } from 'react'
import { getOwnerFromQuery } from './search-field.utils'
import styles from './search-field.module.css'

export class SearchField extends Component {
  state = {
    inputText: '',
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

  render() {
    return (
      <div className={styles['search-field']}>
        <form onSubmit={e => this.onHandleSubmit(e)}>
          <ul>
            <li>
              <input type="search" onChange={e => this.setInputText(e)} />
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

export default SearchField
