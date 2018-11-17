// @flow
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// reducers
import converter from './converter/reducer'
import history from './history/reducer'

const persistConfig = {
  key: 'converter',
  storage,
  blacklist: ['converter'],
}

const configureReducer = () => {
  const reducer = persistReducer(
    persistConfig,
    combineReducers({
      converter,
      history,
    }),
  )

  return reducer
}

export default configureReducer
