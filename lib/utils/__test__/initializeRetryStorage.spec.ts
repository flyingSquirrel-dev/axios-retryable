import { BASE_TARGET_RETRY_COUNTS } from '../../contants'
import { initializeRetryStorage, retryStorage } from '../initializeRetryStorage'

test('should set retryStorage for the first time', () => {
  const mockURL = 'https://mock.url.com/'
  const errorConfig = { url: mockURL }

  initializeRetryStorage({
    errorConfig,
  })

  expect(retryStorage).toEqual({
    [mockURL]: {
      targetRetryCounts: BASE_TARGET_RETRY_COUNTS,
      currentRetryCounts: 0,
    },
  })
})
