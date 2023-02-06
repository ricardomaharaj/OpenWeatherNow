import { daysArray } from './consts'

export const time = {
  getHours(time: number) {
    const date = new Date(time * 1000)
    let hours = date.getHours()
    if (hours > 12) {
      hours = hours - 12
    }
    if (hours === 0) {
      hours = 12
    }
    return hours
  },
  getMinutes(time: number) {
    const date = new Date(time * 1000)
    return date.getMinutes()
  },
  getPostfix(time: number) {
    const date = new Date(time * 1000)
    let postfix = 'AM'
    if (date.getHours() > 12) {
      postfix = 'PM'
    }
    return postfix
  },
  getDay(time: number) {
    return daysArray[new Date(time * 1000).getDay()]
  },
  getDayOfMonth(time: number) {
    return new Date(time * 1000).getDate()
  }
}
