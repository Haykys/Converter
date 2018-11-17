import {
  FETCH_RATES,
  SWAP_CURRENCY,
  CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  LOAD_CONVERSIONS,
} from '../types'

const initialState = {
  baseCurrency: 'EUR',
  quoteCurrency: 'USD',
  amount: 100,
  rates: [],
}

const reducer = (state = initialState, action) => {
  // TODO refactor to be dry
  const selectedBase =
    action.payload &&
    action.payload.baseCurrency !== 'EUR' &&
    state.rates.find(el => el.currency === action.payload)

  const selectedQuote = state.rates.find(el => el.currency === action.payload)

  switch (action.type) {
    case FETCH_RATES: {
      return {
        ...state,
        time: action.payload.data.time,
        rates: action.payload.data.rates,
        selectedQuote: action.payload.data.rates.find(
          el => el.currency === state.quoteCurrency,
        ),
      }
    }
    case CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.payload || 0,
      }
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
        selectedQuote: state.selectedBase,
        selectedBase: state.selectedQuote,
      }
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload,
        selectedBase,
      }
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.payload,
        selectedQuote,
      }
    case LOAD_CONVERSIONS:
      return {
        ...state,
        baseCurrency: action.payload.base,
        quoteCurrency: action.payload.quoted,
        selectedQuote: state.rates.find(
          el => el.currency === action.payload.quoted,
        ),
        selectedBase:
          action.payload.base !== 'EUR' &&
          state.rates.find(el => el.currency === action.payload.base),
      }
    default:
      return state
  }
}

export default reducer
