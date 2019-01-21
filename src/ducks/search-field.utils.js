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
