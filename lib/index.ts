import { AxiosInstance } from 'axios'

export const axiosRetryable = (axiosInstance: AxiosInstance, config?: any) => {
  axiosInstance.interceptors.response.use()
}
