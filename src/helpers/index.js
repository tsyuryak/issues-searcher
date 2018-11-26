export const toLocalDateTime = string => {
  const dateTime = new Date(Date.parse(string))
  return {
    date: dateTime.toLocaleDateString(),
    time: dateTime.toLocaleTimeString(),
  }
}

export const generateId = () =>
  (Math.random() * 10000 * Date.now()).toString(36)
