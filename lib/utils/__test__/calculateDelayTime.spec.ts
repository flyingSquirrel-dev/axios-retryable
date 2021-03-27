import { calculateDelayTime } from '../calculateDelayTime'

test('exponential mode testing', () => {
  for (let currentRetryCounts = 0; currentRetryCounts < 5; ++currentRetryCounts) {
    const exponentBase = 2
    const exponent = 2
    const result = calculateDelayTime({
      mode: 'exponential',
      delayMilliseconds: 0,
      exponent,
      exponentBase,
      config: {
        targetRetryCounts: 5,
        currentRetryCounts,
      },
    })
    expect(result).toBe(Math.pow(exponentBase, currentRetryCounts * exponent) * 1000)
  }
})

test('multiple mode testing', () => {
  for (let currentRetryCounts = 0; currentRetryCounts < 5; ++currentRetryCounts) {
    const delayMilliseconds = 3000
    const result = calculateDelayTime({
      mode: 'multiple',
      delayMilliseconds,
      exponent: 2,
      exponentBase: 2,
      config: {
        targetRetryCounts: 5,
        currentRetryCounts,
      },
    })
    expect(result).toBe(delayMilliseconds * (currentRetryCounts + 1))
  }
})
