import { AxiosInstance, AxiosRequestConfig } from 'axios'

type Mode = 'exponential' | 'multiple'

interface AxiosRetryableConfig {
  mode?: Mode
  exponent?: number
  exponentBase?: number
  retryTimes?: number
  delay?: number
  axiosTimeout?: number
  retryHttpStatus?: number
  callback?: Function
}

interface RetryRequest {
  axiosInstance: AxiosInstance
  axiosConfig: AxiosRequestConfig
  mode?: Mode
  exponent?: number
  exponentBase?: number
  axiosTimeout?: number
  delayMilliseconds?: number
}

interface RetryCount {
  targetRetryCounts: number
  currentRetryCounts: number
}

interface InitialRetryStorage {
  errorConfig: AxiosRequestConfig
  retryTimes?: number
}

interface CaculateDelayTime {
  mode: Mode
  delayMilliseconds: number
  exponent: number
  exponentBase: number
  config: RetryCount
}
