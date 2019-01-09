export const queryItemIsValid = str => {
  const validator = /^[A-Za-z]{1}\w+$/
  return validator.test(str)
}

export const getOwnerFromQuery = query => {
  const lastSymb = query[query.length - 1]
  const separatorRegExp = /^(\s?|\/?)$/
  const owner =
    queryItemIsValid(query.slice(0, -1)) && separatorRegExp.test(lastSymb)
      ? query.slice(0, -1)
      : null

  return owner
}

export const getOwnerAndRepoByQuery = query => {}
