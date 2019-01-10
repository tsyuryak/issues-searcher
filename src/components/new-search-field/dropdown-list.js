import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  activeItemSelector,
  visibleSelector,
  loadedSelector,
  repoesSelector,
  typedValueSelector,
  ownerSelector,
  filteredRepoSelector,
  setActiveItem,
  setTestValues,
} from '../../ducks/search-field'
import styles from './dropdown-list.module.css'

class DropdownList extends Component {
  constructor(props) {
    super(props)
    if (process.env.STORYBOOK_MODE) {
      const { setTestValues, testState } = props
      setTestValues({
        visible: testState.visible,
        activeItem: testState.activeItem,
        owner: testState.owner,
        repoes: testState.repoes,
        typedValue: testState.typedValue,
      })
    }
  }

  resetActiveItem = () => {
    this.props.setActiveItem(-1)
  }

  render() {
    const {
      filteredList,
      setActiveItem,
      activeItem,
      onGoToRepo,
      visible,
      loaded,
      owner,
    } = this.props

    if (!visible || !loaded) {
      return null
    }

    return (
      <ul
        className={styles['repo-list']}
        onMouseEnter={() => this.resetActiveItem()}
        onMouseLeave={() => this.resetActiveItem()}
      >
        {filteredList.map((r, i) => (
          <li
            key={r.id}
            className={activeItem === i ? styles['active'] : null}
            onClick={() => onGoToRepo(owner, r.name)}
            onMouseEnter={() => setActiveItem(i)}
          >
            {r.name}
          </li>
        ))}
      </ul>
    )
  }
}

DropdownList.propTypes = {
  visible: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  repoes: PropTypes.array.isRequired,
  filteredList: PropTypes.array.isRequired,
  typedValue: PropTypes.string,
  owner: PropTypes.string.isRequired,
  activeItem: PropTypes.number.isRequired,
  onGoToRepo: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    loaded: loadedSelector(state),
    visible: visibleSelector(state),
    repoes: repoesSelector(state),
    typedValue: typedValueSelector(state),
    owner: ownerSelector(state),
    activeItem: activeItemSelector(state),
    filteredList: filteredRepoSelector(state),
    testState: state,
  }),
  { setActiveItem, setTestValues }
)(DropdownList)
