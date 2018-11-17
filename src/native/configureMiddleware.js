// @flow
import { createLogger as createLoggerMiddleware } from 'redux-logger'
import promise from 'redux-promise'

const configureMiddleware = () => {
  const logger = createLoggerMiddleware({
    collapsed: true,
  })
  const middleware = [promise, logger]

  return middleware
}

export default configureMiddleware
