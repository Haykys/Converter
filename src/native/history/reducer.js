import { SAVE_CONVERSION, SAVE_CONVERSION_RATE } from '../types'

const initialState = {
  conversions: [],
  conversionRates: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONVERSION:
      return {
        ...state,
        conversions: [...state.conversions, action.payload],
      }
    case SAVE_CONVERSION_RATE:
      return {
        ...state,
        conversionRates: [...state.conversionRates, action.payload],
      }
    default:
      return state
  }
}

export default reducer
