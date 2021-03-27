import { CaculateDelayTime } from '../@types'
import { EXPONENTIAL, MULTIPLE } from '../contants'

export function calculateDelayTime({ mode, delayMilliseconds, exponent, exponentBase, config }: CaculateDelayTime) {
  switch (mode) {
    case EXPONENTIAL:
      return Math.pow(exponentBase, config.currentRetryCounts * exponent) * 1000

    case MULTIPLE:
      return delayMilliseconds * (config.currentRetryCounts + 1)
  }
}
