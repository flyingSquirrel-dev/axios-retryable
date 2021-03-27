import { BASE_TARGET_RETRY_COUNTS } from '../contants'
import { InitialRetryStorage, RetryCount } from '../@types'

export let retryStorage: Record<string, RetryCount> = {}

export function initializeRetryStorage({ errorConfig, retryTimes = BASE_TARGET_RETRY_COUNTS }: InitialRetryStorage) {
  if (errorConfig?.url !== undefined && retryStorage[errorConfig?.url] === undefined) {
    retryStorage[errorConfig?.url] = {
      currentRetryCounts: 0,
      targetRetryCounts: retryTimes,
    }
  }
}
