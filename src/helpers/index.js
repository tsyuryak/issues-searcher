export const toLocalDateTime = string => {
  const dateTime = new Date(Date.parse(string))
  return {
    date: dateTime.toLocaleDateString(),
    time: dateTime.toLocaleTimeString(),
  }
}
