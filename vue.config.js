// const path = require('path')
module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  },
  devServer: {
    // 解决开发时跨域
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
