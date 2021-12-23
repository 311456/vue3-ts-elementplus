import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'

export function formatUtcTime(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 默认是0时区的时间，但是我们是在东八区，所以需要加上8个小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

// 时间戳格式化
// export function formatTimestamp(
//   timestamp: string,
//   format: string = DATE_TIME_FORMAT
// ){
//   return
// }
