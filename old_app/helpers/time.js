export function getTimeStringLong(time) {
  return time
    ? `${time.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })}, ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : ''
}

export function getTimeStringShort(time) {
  return time
    ? `${time.toLocaleDateString(undefined, {
        month: '2-digit',
        day: 'numeric',
        year: '2-digit',
      })}, ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : ''
}

export function getTimeDateString(time) {
  return time
    ? `${time.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })}`
    : ''
}

export function getTimeTimeString(time) {
  return time ? `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''
}
