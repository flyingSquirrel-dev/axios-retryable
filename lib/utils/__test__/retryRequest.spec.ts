import axios from 'axios'
import { initializeRetryStorage } from '../initializeRetryStorage'
import { retryRequest } from '../retryRequest'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      request: jest.fn(),
    })),
  }
})

test('axiosInstance.request function should be called', async () => {
  const axios = require('axios')
  const mockURL = 'https://mock.url.com/'
  const axiosConfig = {
    url: mockURL,
  }

  initializeRetryStorage({
    errorConfig: {
      url: mockURL,
    },
  })

  const axiosInstance = axios.create()

  await retryRequest({
    axiosInstance,
    axiosConfig,
    mode: 'multiple',
    delayMilliseconds: 5000,
  })

  expect(axiosInstance.request).toHaveBeenCalled()
})

test('axiosInstance.request function has not been called', async () => {
  const axios = require('axios')
  const mockURL = 'https://mock.other.url.com/'
  const axiosConfig = {
    url: mockURL,
  }

  initializeRetryStorage({
    errorConfig: {
      url: mockURL,
    },
    retryTimes: 0,
  })

  const axiosInstance = axios.create()

  const result = await retryRequest({
    axiosInstance,
    axiosConfig,
    mode: 'multiple',
    delayMilliseconds: 1000,
  })

  expect(axiosInstance.request).toBeCalledTimes(0)
  expect(result).toBe(undefined)
})
