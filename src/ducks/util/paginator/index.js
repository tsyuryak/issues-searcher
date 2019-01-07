export const getViews = (pagesQuantity, limit) => {
  if (pagesQuantity === 0) {
    return []
  }
  const range = [...Array(pagesQuantity).keys()].map(i => i + 1)
  const viewRange = []
  if (limit === 0) {
    viewRange.push(range)
  } else {
    const num = limit > 0 ? pagesQuantity / limit : 1
    for (let i = 0; i < Math.floor(num); i++) {
      viewRange.push(range.slice(limit * i, limit * (i + 1)))
    }
    if (pagesQuantity % limit !== 0) {
      viewRange.push(range.slice(-limit))
    }
  }
  return viewRange
}

class Paginator {
  constructor(pagesQuantity = 0, limit = 0) {
    this.currentPage = 0
    this.views = this.initViews(pagesQuantity, limit)
  }
  initViews(pagesQuantity, limit) {
    if (pagesQuantity === 0) {
      return []
    }
    const range = [...Array(pagesQuantity).keys()].map(i => i + 1)
    const viewRange = []
    if (limit === 0) {
      viewRange.push(range)
    } else {
      const num = limit > 0 ? pagesQuantity / limit : 1
      for (let i = 0; i < Math.floor(num); i++) {
        viewRange.push(range.slice(limit * i, limit * (i + 1)))
      }
      if (pagesQuantity % limit !== 0) {
        viewRange.push(range.slice(-limit))
      }
    }
    return viewRange
  }

  getViews() {
    return this.views
  }

  getCurrentPage() {
    return this.currentPage
  }

  getLastPage() {
    return this.views.length - 1
  }

  setCurrentPage(num) {
    this.currentPage = num
  }

  next() {
    const lastPage = this.getLastPage()
    let currentPage = this.getCurrentPage()
    if (currentPage < lastPage) {
      currentPage += 1
      this.setCurrentPage(currentPage)
    }
    const views = this.getViews()
    return views[currentPage]
  }

  prev() {
    let currentPage = this.getCurrentPage()
    if (currentPage > 0) {
      currentPage -= 1
      this.setCurrentPage(currentPage)
    }
    const views = this.getViews()
    return views[currentPage]
  }

  getCurrentView() {
    const views = this.getViews()
    const currentPage = this.getCurrentPage()
    return views[currentPage]
  }
}
