import axios from 'axios'
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `http://39.107.97.113:3000/api`,
  timeout: 5000,
})

export const tokenJudgeConfig = (instance) => {
  instance.interceptors.response.use(
    async (response) => {
      if (![response?.data?.code].includes(401)) {
        return response
      } else {
        const tokenData = await axiosInstance.post('/updateAccessToken', {
          refresh_token: localStorage.getItem('refresh_token'),
        })
        if (tokenData.data.code === 200) {
          const accessToken = tokenData.data?.data?.access_token
          localStorage.setItem('access_token', accessToken)
          console.log("更新access_token")
          const result = await instance?.(response.config)
          return result
        } else {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          setTimeout(() => {
            window.location.href = '/Questionnaire/login'
          }, 300)
          return response
        }
      }
    },
    (error) => new Error(error)
  )
}