let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://152.136.185'
} else {
  BASE_URL = 'http://xxxx'
}

export { BASE_URL, TIME_OUT }
