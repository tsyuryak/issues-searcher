//Utils

export const readySearchRepo = text => {
  const pattern = /(^\S+\/+$|^\S+\s+$)/
  return text.match(pattern)
}

export const isQueryResulsIsValid = result => {
  const check = text => {
    return (
      text.match(/^\d+/) ||
      text.match(/\*/) ||
      text.match(/^-+/) ||
      text.match(/-+$/)
    )
  }

  return (
    !check(result.owner) && (!check(result.repo) || result.repo.length === 0)
  )
}

export const parseQueryText = text => {
  const trimmedText = text.trim()
  const spacePattern = /\s+/
  const slashPattern = /\/{1}/
  const hasSpace = trimmedText.match(spacePattern)
  const hasSlash = trimmedText.match(slashPattern)

  const getQueryArgs = arr => ({ owner: arr[0].trim(), repo: arr[1].trim() })

  if (hasSlash) {
    const arr = trimmedText.split(slashPattern)
    return getQueryArgs(arr)
  }

  if (hasSpace) {
    const arr = trimmedText.split(spacePattern)
    return getQueryArgs(arr)
  }

  return { owner: trimmedText, repo: '' }
}

/////////////////////////////////////////////////////////////////////////

export const textHasOwner = owner => {
  const validator = string => {
    const pattern = /^[a-zA-Z]+\w*[-*\w+$]*\w+$/
    return string.match(pattern) || string.split(/\s+|\/{1}/)[0].match(pattern)
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

export const getTextAfterOwner = (string, owner) => {
  const res = string.replace(owner, '')
  return res.replace(/(\s+|\/+)/, '').trim()
}
