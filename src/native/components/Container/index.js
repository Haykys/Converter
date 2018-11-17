// external libs
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6A00',
  },
}

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
