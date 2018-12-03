export const toLocalDateTime = string => {
  const dateTime = new Date(Date.parse(string))
  const timeChunks = dateTime.toLocaleTimeString().split(':')
  const time =
    timeChunks[0].length < 2 && +timeChunks[0] < 10
      ? `0${timeChunks[0]}:${timeChunks[1]}:${timeChunks[2]}`
      : dateTime.toLocaleTimeString()
  return {
    date: dateTime.toLocaleDateString(),
    time,
  }
}

export const generateId = () =>
  (Math.random() * 10000 * Date.now()).toString(36)
