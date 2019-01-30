import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import {
  init,
  baseUrlSelector,
  activePageSelector,
  quantitySelector,
  maxLimitSelector,
  paginatorViewContentSelector,
  toFirstPage,
  toLastPage,
  toPageByNum,
  toPrevPage,
  toNextPage,
  perPagePageSelector,
  toURL,
} from '../../../ducks/paginator'
import styles from './styles/paginator.module.css'
import ComboBox from './items-changer-combo'
import PageLink from './page-link'

const text = {
  next: 'Next',
  prev: 'Prev',
  first: 'First',
  last: 'Last',
}
class Paginator extends Component {
  constructor(props) {
    super(props)
    props.init(props.params)
  }

  state = {
    dropupVisible: false,
  }

  goToPage = (e, url) => {
    e.preventDefault()
    this.props.toURL(url)
  }

  hideDropup = () => {
    this.setState(state => {
      if (state.dropupVisible) {
        return { dropupVisible: false }
      }
    })
  }

  toggleDropup = e => {
    e.stopPropagation()
    return this.setState(state => ({
      dropupVisible: !state.dropupVisible,
    }))
  }

  showNext = () => {
    const { activePage, maxLimit, toNextPage } = this.props
    return (
      <PageLink
        visible={activePage < maxLimit}
        className={styles['pbutton']}
        text={text.next}
        goToPage={toNextPage}
      />
    )
  }

  showPrev = () => {
    const { activePage, toPrevPage } = this.props
    return (
      <PageLink
        visible={activePage > 1}
        className={styles['pbutton']}
        text={text.prev}
        goToPage={toPrevPage}
      />
    )
  }

  showFirst = () => {
    const { activePage, toFirstPage } = this.props
    return (
      <PageLink
        visible={activePage > 1}
        className={styles['pbutton']}
        text={text.first}
        goToPage={toFirstPage}
      />
    )
  }

  showLast = () => {
    const { activePage, maxLimit, toLastPage } = this.props
    return (
      <PageLink
        visible={activePage < maxLimit}
        className={styles['pbutton']}
        text={text.last}
        goToPage={toLastPage}
      />
    )
  }

  showLink = item => {
    const { activePage, toPageByNum } = this.props
    return (
      <PageLink
        visible={true}
        className={`${styles['pbutton']} ${
          item === activePage ? styles['active'] : null
        }`}
        text={item}
        goToPage={item === activePage ? () => false : () => toPageByNum(item)}
      />
    )
  }

  render() {
    if (!this.props.paginatorContent.length) {
      return null
    }
    return (
      <div className={styles['container']}>
        <ul className={styles['pagination']}>
          <li>{this.showFirst()}</li>
          <li>{this.showPrev()}</li>
          {this.props.paginatorContent.map(item => (
            <li key={uniqid()}>{this.showLink(item)}</li>
          ))}
          <li>{this.showNext()}</li>
          <li>{this.showLast()}</li>
        </ul>
        <div style={{ marginLeft: '10px' }}>
          <ComboBox
            quantity={this.props.perPage}
            dropupVisible={this.state.dropupVisible}
            toggleCombo={e => this.toggleDropup(e)}
            baseUrl={this.props.baseUrl}
            changeQuantity={this.goToPage}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('click', this.hideDropup)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideDropup)
  }
}

Paginator.defaultProps = {
  paginatorContent: [],
}

Paginator.propTypes = {
  params: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    activePage: PropTypes.number.isRequired,
    maxLimit: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
}

export default connect(
  state => ({
    baseUrl: baseUrlSelector(state),
    activePage: activePageSelector(state),
    quantity: quantitySelector(state),
    maxLimit: maxLimitSelector(state),
    paginatorContent: paginatorViewContentSelector(state),
    perPage: perPagePageSelector(state),
  }),
  { init, toFirstPage, toLastPage, toPageByNum, toPrevPage, toNextPage, toURL }
)(Paginator)
