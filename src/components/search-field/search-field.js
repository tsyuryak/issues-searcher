import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ownerSelector,
  visibleSelector,
  loadingSelector,
  changeDropdownActiveItem,
  activeItemSelector,
  inputTextSelector,
  changeInputText,
  repoesSelector,
  goToIssues,
  hideDropdown,
} from '../../ducks/search-field'
import styles from './search-field.module.css'
import DropdownList from './dropdown-list'

export class SearchField extends Component {
  handleInputText = e => {
    const { changeInputText } = this.props
    const text = e.target.value
    changeInputText(text)
  }

  onHandleSubmit = e => {
    e.preventDefault()
    this.props.goToIssues()
  }

  getSearchButtonState = () => {
    const { loading } = this.props

    return {
      text: !loading ? 'Search' : 'Loading repo...',
      disabled: loading,
    }
  }

  resetActiveItem = () => {
    this.props.changeDropdownActiveItem({ id: 0, name: '' })
  }

  hideDropdown = () => {
    this.props.hideDropdown()
  }

  handleKeyDown = e => {
    const {
      changeDropdownActiveItem,
      activeItem,
      repoes,
      goToIssues,
    } = this.props

    //Времянка
    if (repoes.length === 0) return
    ////
    if (e.keyCode === 40) {
      let item = activeItem.id % repoes.length
      changeDropdownActiveItem({
        itemId: item + 1,
        name: repoes[item].name,
      })
    } else if (e.keyCode === 38) {
      e.preventDefault()
      let item = activeItem.id % (repoes.length + 1)
      item = item <= 1 ? repoes.length + 1 : item
      changeDropdownActiveItem({
        itemId: item - 1,
        name: repoes[item - 2].name,
      })
    } else if (e.keyCode === 13) {
      goToIssues()
    } else if (e.keyCode === 8) {
      this.resetActiveItem()
    }
  }

  componentWillMount = () => {
    window.addEventListener('click', this.hideDropdown)
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.hideDropdown)
  }

  render() {
    const buttonState = this.getSearchButtonState()
    const {
      inputText,
      activeItem,
      visible,
      changeDropdownActiveItem,
      repoes,
      goToIssues,
    } = this.props
    return (
      <div className={styles['search-field']}>
        <form onSubmit={e => this.onHandleSubmit(e)}>
          <ul>
            <li>
              <div>
                <input
                  type="search"
                  onChange={e => this.handleInputText(e)}
                  value={inputText}
                  autoFocus
                  onKeyDown={e => this.handleKeyDown(e)}
                />
                {visible && (
                  <DropdownList
                    repoes={repoes}
                    activeItem={activeItem}
                    resetActiveItem={this.resetActiveItem}
                    setActiveItem={changeDropdownActiveItem}
                    onGoToIssues={goToIssues}
                  />
                )}
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
  visible: PropTypes.bool.isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    repo: PropTypes.string,
  }).isRequired,
  owner: PropTypes.string,
  inputText: PropTypes.string.isRequired,
  changeInputText: PropTypes.func.isRequired,
  hideDropdown: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    owner: ownerSelector(state),
    repoes: repoesSelector(state),
    visible: visibleSelector(state),
    loading: loadingSelector(state),
    activeItem: activeItemSelector(state),
    inputText: inputTextSelector(state),
  }),
  { changeDropdownActiveItem, changeInputText, goToIssues, hideDropdown }
)(SearchField)
