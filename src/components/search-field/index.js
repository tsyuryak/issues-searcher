import React, { Component } from 'react'
import { connect } from 'react-redux'
import ValidInput from './valid-input'
import styles from './search-field.module.css'
import { redirectToIssues } from '../../ducks/issues'
import { getItems, getSplitter } from './search-field-func'

class SearchField extends Component {
  state = {
    inputText: '',
    errorMessage: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.getData(this.state.inputText)
    if (data) {
      this.setState({ errorMessage: '' })
      this.props.redirectToIssues(data.owner, data.repo)
    } else {
      this.setState({ errorMessage: `wrong request: ${this.state.inputText}` })
    }
  }

  handleChange = e => {
    this.setState({ inputText: e.target.value })
  }

  setText = text => {
    this.setState({ inputText: text })
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

  render() {
    return (
      <div className={styles['search-field']}>
        <form onSubmit={this.handleSubmit}>
          <ValidInput
            inputText={this.setText}
            error={this.state.errorMessage}
          />
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
