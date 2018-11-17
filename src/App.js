// external libs
import React from 'react'
import { compose, pure } from 'recompose'
import { Provider as Redux } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
// screens
import Navigator from './native/config/routes'
// config
import configureStore from './native/configureStore'

const withApp = compose(pure)

export const store = configureStore()

const renderApp = () => (
  <Redux store={store}>
    <PersistGate persistor={persistStore(store)}>
      <Navigator />
    </PersistGate>
  </Redux>
)

export default withApp(renderApp)
