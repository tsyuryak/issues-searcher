import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './search-field.module.css'
import { redirectToIssues } from '../../ducks/issues'

class SearchField extends Component {
  state = {
    inputText: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.getData(this.state.inputText)
    this.props.redirectToIssues(data.owner, data.repo)
  }

  handleChange = e => {
    this.setState({ inputText: e.target.value })
  }

  getData = string => {
    const regExp1 = /\w+\s+\w+/ //owner repo
    if (regExp1.test(string)) {
      const arr = string.split(' ').map(i => i.trim())
      return {
        owner: arr[0],
        repo: arr[1],
      }
    }
  }

  render() {
    return (
      <div className={styles['search-field']}>
        <form onSubmit={this.handleSubmit}>
          <input type="search" onChange={this.handleChange} />
          <input type="submit" disabled={!this.state.inputText} />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { redirectToIssues }
)(SearchField)
