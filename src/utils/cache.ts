class LocalCache {
  // 也可以传入一个值来决定是否使用localStorage，false的话就使用sessionStorage等等
  // setCache(key: string, value: any , isLocalStorage : boolean) { }
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
