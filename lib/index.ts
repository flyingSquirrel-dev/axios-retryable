import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { AxiosRetryableConfig } from './@types'
import { ECONNABORTED } from './contants'
import { initializeRetryStorage } from './utils/initializeRetryStorage'
import { retryRequest } from './utils/retryRequest'

// TODO: test commit
export const axiosRetryable = (axiosInstance: AxiosInstance, config: AxiosRetryableConfig) => {
  const { delay, retryTimes, axiosTimeout, retryHttpStatus, callback, mode, exponent, exponentBase } = config

  const onFulfilled = (response: AxiosResponse) => response

  const onRejected = (error: AxiosError) => {
    const statusCode = error?.response?.status
    const isTimeout = error?.code === ECONNABORTED

    initializeRetryStorage({
      errorConfig: error.config,
      retryTimes,
    })

    switch (true) {
      case statusCode === retryHttpStatus:
      case isTimeout:
        return retryRequest({
          mode,
          exponent,
          exponentBase,
          axiosInstance,
          axiosTimeout,
          axiosConfig: error.config,
          delayMilliseconds: delay,
        })
    }

    if (callback) {
      callback()
    }

    return Promise.reject(error)
  }

  axiosInstance.interceptors.response.use(onFulfilled, onRejected)
}
