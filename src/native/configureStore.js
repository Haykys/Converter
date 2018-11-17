// @flow
import { applyMiddleware, createStore } from 'redux'

import configureMiddleware from './configureMiddleware'
import configureReducer from './configureReducer'

const configureStore = () => {
  const reducer = configureReducer()
  const middleware = configureMiddleware()

  const store = createStore(reducer, applyMiddleware(...middleware))

  return store
}

export default configureStore
