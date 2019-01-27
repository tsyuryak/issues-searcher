import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageLink from './page-link'
import ComboBox from './items-changer-combo'
import styles from './styles/paginator.module.css'

class Paginator extends Component {
  getLinksInfo = () => {
    const {
      baseUrl,
      quantity,
      activePage,
      maxLimit,
      perPage,
    } = this.props.params

    const getArray = (start, end, limit) => {
      const resArr = []
      for (let i = start; i < end; i++) {
        resArr.push({ num: i, url: `${baseUrl}/${perPage}/${i}` })
      }
      return resArr.filter(x => x.num <= limit)
    }

    let startVal = 1
    if (activePage >= quantity) {
      startVal =
        quantity % 2 !== 0
          ? activePage - Math.floor(quantity / 2)
          : activePage - quantity / 2 + 1
      return getArray(startVal, quantity + startVal, maxLimit)
    }

    return getArray(startVal, quantity + 1, maxLimit)
  }

  state = {
    linksInfo: [],
    dropupVisible: false,
  }

  goToPage = (e, url) => {
    e.preventDefault()
    this.props.onGoToPage(url)
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
    const {
      baseUrl,
      activePage,
      maxLimit,
      nextLinkText,
      perPage,
    } = this.props.params

    const url = `${baseUrl}/${perPage}/${activePage + 1}`
    return activePage < maxLimit ? (
      <PageLink
        className={styles['pbutton']}
        url={url}
        text={nextLinkText}
        goToPage={this.goToPage}
      />
    ) : null
  }

  showPrev = () => {
    const { baseUrl, activePage, prevLinkText, perPage } = this.props.params
    const url = `${baseUrl}/${perPage}/${activePage - 1}`
    return activePage > 1 ? (
      <PageLink
        className={styles['pbutton']}
        url={url}
        text={prevLinkText}
        goToPage={this.goToPage}
      />
    ) : null
  }

  showFirst = () => {
    const { baseUrl, activePage, firstLinkText, perPage } = this.props.params
    const url = `${baseUrl}/${perPage}/1`
    return activePage > 1 ? (
      <PageLink
        className={styles['pbutton']}
        url={url}
        text={firstLinkText}
        goToPage={this.goToPage}
      />
    ) : null
  }

  showLast = () => {
    const {
      baseUrl,
      activePage,
      lastLinkText,
      maxLimit,
      perPage,
    } = this.props.params
    const url = `${baseUrl}/${perPage}/${maxLimit}`
    return activePage < maxLimit ? (
      <PageLink
        className={styles['pbutton']}
        url={url}
        text={lastLinkText}
        goToPage={this.goToPage}
      />
    ) : null
  }

  showLink = info => {
    const { activePage } = this.props.params
    return info.num !== activePage ? (
      <PageLink
        className={styles['pbutton']}
        url={info.url}
        text={info.num}
        goToPage={this.goToPage}
      />
    ) : (
      <div className={`${styles['pbutton']} ${styles['active']}`}>
        {info.num}
      </div>
    )
  }

  render() {
    if (!this.state.linksInfo.length) {
      return null
    }
    return (
      <div className={styles['container']}>
        <ul className={styles['pagination']}>
          <li>{this.showFirst()}</li>
          <li>{this.showPrev()}</li>
          {this.state.linksInfo.map(info => (
            <li key={info.num}>{this.showLink(info)}</li>
          ))}
          <li>{this.showNext()}</li>
          <li>{this.showLast()}</li>
        </ul>
        <div style={{ marginLeft: '5px' }}>
          <ComboBox
            quantity={this.props.params.perPage}
            dropupVisible={this.state.dropupVisible}
            toggleCombo={e => this.toggleDropup(e)}
            baseUrl={this.props.params.baseUrl}
            changeQuantity={this.goToPage}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ linksInfo: this.getLinksInfo() })
    window.addEventListener('click', this.hideDropup)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideDropup)
  }
}

Paginator.defaultProps = {
  activePage: 1,
}

Paginator.propTypes = {
  params: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    activePage: PropTypes.number.isRequired,
    maxLimit: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    nextLinkText: PropTypes.string.isRequired,
    prevLinkText: PropTypes.string.isRequired,
    firstLinkText: PropTypes.string.isRequired,
    lastLinkText: PropTypes.string.isRequired,
  }),
  onGoToPage: PropTypes.func.isRequired,
}

export default Paginator
