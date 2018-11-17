import { SAVE_CONVERSION, SAVE_CONVERSION_RATE } from '../types'

export const saveConversion = (base, quoted) => ({
  type: SAVE_CONVERSION,
  payload: { base, quoted },
})

export const saveConversionRate = (base, quoted, time, conversionRate) => ({
  type: SAVE_CONVERSION_RATE,
  payload: { base, quoted, date: time, conversionRate },
})
