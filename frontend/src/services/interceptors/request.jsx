export const authHeaderConfig = (instance) => {
    instance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...config.headers,
          Authorization: localStorage.getItem('access_token') ?? '',
          'Content-Type': 'application/json;charset=UTF-8',
          'Cache-Control': 'no-store',
        }
        return config
      },
      (err) => Promise.reject(err)
    )
}