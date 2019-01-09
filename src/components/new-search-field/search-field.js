import React, { Component } from 'react'
import { getOwnerFromQuery } from './utils'
import PropTypes from 'prop-types'
import styles from './search-field.module.css'
import DropdownList from './dropdown-list'

export class SearchField extends Component {
  state = {
    inputText: this.props.owner,
    dropdownIsVisible: false,
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

  toggleDropdownVisibility = () => {
    const { repoes, loaded } = this.props
    const dropdownReady = loaded && repoes.length > 0
    this.setState({ dropdownIsVisible: dropdownReady })
  }

  componentWillMount = () => {
    this.toggleDropdownVisibility()
  }

  render() {
    const buttonState = this.getSearchButtonState()
    const { owner, repoes } = this.props
    return (
      <div className={styles['search-field']}>
        <form onSubmit={e => this.onHandleSubmit(e)}>
          <ul>
            <li>
              <div>
                <input
                  type="search"
                  onChange={e => this.setInputText(e)}
                  value={this.state.inputText}
                />
                <DropdownList
                  owner={owner}
                  visible={this.state.dropdownIsVisible}
                  repoes={repoes}
                  typedValue={''}
                  onGoToRepo={(a, b) => console.log(`${a} ${b}`)}
                />
              </div>
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
