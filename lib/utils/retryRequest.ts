import { RetryRequest } from '../@types'
import { BASE_AXIOS_TIMEOUT, BASE_DELAY, BASE_EXPONENT, BASE_EXPONENT_BASE, MULTIPLE } from '../contants/index'
import { calculateDelayTime } from './calculateDelayTime'
import { retryStorage } from './initializeRetryStorage'

export function retryRequest({
  axiosInstance,
  axiosConfig,
  mode = MULTIPLE,
  exponent = BASE_EXPONENT,
  exponentBase = BASE_EXPONENT_BASE,
  axiosTimeout = BASE_AXIOS_TIMEOUT,
  delayMilliseconds = BASE_DELAY,
}: RetryRequest) {
  const config = retryStorage[axiosConfig.url as string]
  const shouldRetry = config.targetRetryCounts - config.currentRetryCounts > 0
  const delayTime = calculateDelayTime({
    mode,
    exponent,
    exponentBase,
    delayMilliseconds,
    config,
  })

  if (shouldRetry) {
    return new Promise((resolve) => {
      setTimeout(() => {
        config.currentRetryCounts += 1
        resolve(
          axiosInstance.request({
            ...axiosConfig,
            timeout: axiosTimeout,
          }),
        )
      }, delayTime)
    })
  }
}
