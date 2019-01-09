export const getOwnerFromQuery = query => {
  const lastSymb = query[query.length - 1]
  const ownerRegExp = /^[A-Za-z]{1}\w+$/
  const separatorRegExp = /^(\s?|\/?)$/
  const owner =
    ownerRegExp.test(query.slice(0, -1)) && separatorRegExp.test(lastSymb)
      ? query.slice(0, -1)
      : null

  return owner
}
