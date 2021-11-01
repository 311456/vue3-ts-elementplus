import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'

export function formatUtcTime(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}

// 时间戳格式化
// export function formatTimestamp(
//   timestamp: string,
//   format: string = DATE_TIME_FORMAT
// ){
//   return
// }
