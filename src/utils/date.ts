export const getLocalTime = (date: Date, cityTimezoneOffset: number) => {
  const utcTime = date.getTime() + cityTimezoneOffset * 1000
  return new Date(utcTime).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}