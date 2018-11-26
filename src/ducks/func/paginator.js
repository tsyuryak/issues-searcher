export default class Paginator {
  constructor(data) {
    this.data = data
  }

  hasPages = () => !!this.data

  maxPage = () => {
    const regExpLast = /page=\d+>; rel="last"/
    const regExpPrev = /page=\d+>; rel="prev"/

    if (!this.data) {
      return 1
    }

    return !regExpLast.test(this.data) && regExpPrev.test(this.data)
      ? this.getLastPage(regExpPrev) + 1
      : this.getLastPage(regExpLast)
  }

  getLastPage = regExp => +this.data.match(regExp)[0].match(/\d+/)[0]
}
