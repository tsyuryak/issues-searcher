import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ownerSelector,
  setTestValues,
  visibleSelector,
  setActiveItem,
  loadingSelector,
  loadedSelector,
  activeItemSelector,
  inputTextSelector,
  setInputText,
  hideDropdown,
  typedValueSelector,
} from '../../ducks/search-field'
import styles from './search-field.module.css'
import DropdownList from './dropdown-list'

export class SearchField extends Component {
  componentDidMount = () => {
    if (process.env.STORYBOOK_MODE) {
      const { setTestValues, testState } = this.props
      setTestValues({
        visible: testState.visible,
        activeItem: testState.activeItem,
        repoes: testState.repoes,
        typedValue: testState.typedValue,
        loading: testState.loading,
        owner: testState.owner,
      })
    }
  }

  handleInputText = e => {
    const { setInputText, owner } = this.props
    const text = e.target.value
    setInputText(text)
    if (owner) {
      this.props.onSearchRepoes(owner)
    }
  }

  onHandleSubmit = e => {
    e.preventDefault()
    const { inputText } = this.state
    this.props.onSearchIssues(inputText)
  }

  getSearchButtonState = () => {
    const { loading, inputText } = this.props
    const text = !loading ? 'Search' : 'Loading repo...'
    const disabled = !inputText.trim() || loading
    return {
      text,
      disabled,
    }
  }

  setDropdownInvisible = () => {
    this.props.hideDropdown()
  }

  handleKeyDown = e => {
    const { setActiveItem, activeItem } = this.props
    if (e.keyCode === 40) {
      setActiveItem(activeItem + 1)
    } else if (e.keyCode === 38) {
      setActiveItem(activeItem - 1)
    } else if (e.keyCode === 13) {
      console.log(e.keyCode)
    }
  }

  componentWillMount = () => {
    //window.addEventListener('click', this.setDropdownInvisible)
  }

  componentWillUnmount = () => {
    //window.removeEventListener('click', this.setDropdownInvisible)
  }

  render() {
    const buttonState = this.getSearchButtonState()
    const { inputText, loading } = this.props
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
                  onKeyDown={e => this.handleKeyDown(e)}
                />
                {!loading && <DropdownList />}
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
  visible: PropTypes.bool.isRequired,
  activeItem: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
  typedValue: PropTypes.string.isRequired,
  inputText: PropTypes.string.isRequired,
  setInputText: PropTypes.func.isRequired,
  hideDropdown: PropTypes.func.isRequired,
  onSearchIssues: PropTypes.func.isRequired,
  onSearchRepoes: PropTypes.func.isRequired,
  onGotoRepo: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    owner: ownerSelector(state),
    visible: visibleSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    activeItem: activeItemSelector(state),
    inputText: inputTextSelector(state),
    typedValue: typedValueSelector(state),
    testState: state,
  }),
  { setTestValues, setActiveItem, setInputText, hideDropdown }
)(SearchField)
