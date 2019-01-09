import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOwnerFromQuery, getTextAfterOwner } from './utils'
import PropTypes from 'prop-types'
import styles from './search-field.module.css'
import DropdownList from './dropdown-list'

export class SearchField extends Component {
  state = {
    inputText: this.props.owner,
    dropdownIsVisible: false,
    activeItem: -1,
    repoListLength: 0,
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

  setDropdownInvisible = () => {
    this.setState({ dropdownIsVisible: false })
  }

  handleKeyDown = e => {
    console.log(e.keyCode)
    if (e.keyCode === 40) {
      this.setState({ activeItem: this.state.activeItem + 1 })
    } else if (e.keyCode === 38) {
      this.setState({ activeItem: this.state.activeItem - 1 })
    }
  }

  setActiveItem = item => {
    this.setState({ activeItem: item })
  }

  componentWillMount = () => {
    this.toggleDropdownVisibility()
    //window.addEventListener('click', this.setDropdownInvisible)
  }

  componentWillUnmount = () => {
    //window.removeEventListener('click', this.setDropdownInvisible)
  }

  render() {
    const buttonState = this.getSearchButtonState()
    const { owner, repoes, onGotoRepo } = this.props
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
                  onKeyDown={e => this.handleKeyDown(e)}
                />
                <DropdownList
                  owner={owner}
                  visible={this.state.dropdownIsVisible}
                  repoes={repoes}
                  typedValue={getTextAfterOwner(this.state.inputText, owner)}
                  onGoToRepo={onGotoRepo}
                  activeItem={this.state.activeItem}
                  resetActiveItem={this.setActiveItem(-1)}
                  setActiveItem={this.setActiveItem}
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

SearchField.defaultProps = {
  owner: '',
}

SearchField.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  owner: PropTypes.string,
  onSearchIssues: PropTypes.func.isRequired,
  onSearchRepoes: PropTypes.func.isRequired,
  onGotoRepo: PropTypes.func.isRequired,
}

export default connect()(SearchField)
