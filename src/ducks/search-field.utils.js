//Utils

export const getOwnerFromText = owner => {
  const validator = string => {
    const pattern = /^[a-zA-Z]+\w*[-*\w+$]*\w+$/
    return string.match(pattern)
  }

  return validator(owner) && owner.length > 1
}

export const startRequest = text => {
  const pattern = /(\s+$|\/{1}\s*$)/
  return text.match(pattern)
}

export const queryItemIsValid = str => {
  const validator = /^[A-Za-z]{1}\w+$/
  return str && validator.test(str)
}

export const getOwnerFromQuery = query => {
  try {
    const lastSymb = query[query.length - 1]
    const separatorRegExp = /^(\s?|\/?)$/
    const owner =
      queryItemIsValid(query.slice(0, -1)) && separatorRegExp.test(lastSymb)
        ? query.slice(0, -1)
        : null

    return owner
  } catch (error) {
    return null
  }
}

export const getTextAfterOwner = (string, separator) => {
  const res = string.replace(separator, '')
  return res.replace(/(\s+|\/+)/, '').trim()
}
