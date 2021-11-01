import { App } from 'vue'

import { formatUtcTime } from '@/utils/date-format'

export default function registerProperties(app: App) {
  // 一般全局的函数使用$开头
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcTime(value)
    }
  }
}
