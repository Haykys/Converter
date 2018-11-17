// external libs
import axios from 'axios'
import {
  FETCH_RATES,
  SWAP_CURRENCY,
  CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  LOAD_CONVERSIONS,
} from '../types'

const ROOT_URL = 'https://txf-ecb.glitch.me/ratesass'

export const getRates = () => {
  const request = axios.get(`${ROOT_URL}`)

  return {
    type: FETCH_RATES,
    payload: request,
  }
}

export const swapCurrency = () => ({
  type: SWAP_CURRENCY,
})

export const changeCurrencyAmount = amount => ({
  type: CURRENCY_AMOUNT,
  payload: parseFloat(amount),
})

export const changeBaseCurrency = currency => ({
  type: CHANGE_BASE_CURRENCY,
  payload: currency,
})

export const changeQuoteCurrency = currency => ({
  type: CHANGE_QUOTE_CURRENCY,
  payload: currency,
})

export const loadConversions = (base, quoted) => ({
  type: LOAD_CONVERSIONS,
  payload: { base, quoted },
})
