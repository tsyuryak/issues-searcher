const REGEXP_LAST = /page=\d+>; rel="last"/
const REGEXP_PREV = /page=\d+>; rel="prev"/

export const getLastPage = (
  data,
  regExpLast = REGEXP_LAST,
  regExpPrev = REGEXP_PREV
) => {
  const getLastPageByRegExp = regExp => +data.match(regExp)[0].match(/\d+/)[0]

  if (!data) {
    return 1
  }

  return !regExpLast.test(data) && regExpPrev.test(data)
    ? getLastPageByRegExp(regExpPrev) + 1
    : getLastPageByRegExp(regExpLast)
}
