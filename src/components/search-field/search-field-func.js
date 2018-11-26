export const getSplitter = (string, splitters) => {
  for (let i = 0; i < splitters.length; i++) {
    const splitter = splitters[i]
    if (string.match(splitter)) {
      return splitter
    }
  }

  throw new Error("Hasn't splitter")
}

export const getItems = (string, splitter) =>
  string.split(splitter).map(item => item.trim())
