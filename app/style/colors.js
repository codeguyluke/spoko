const green = 'rgb(23, 193, 24)'
const navy = 'rgb(0, 0, 90)'
const grey = 'rgb(100, 100, 100)'
const red = 'rgb(220, 20, 60)'
const yellow = 'rgb(238, 198, 67)'
const violet = 'rgb(132, 21, 132)'

export function rgbToRgba(rgb, alpha) {
  const regex = /\((.*)\)/
  const color = rgb.match(regex)[1]
  return `rgba(${color}, ${alpha})`
}

export default {
  green,
  grey,
  red,
  navy,
  yellow,
  violet,
}
