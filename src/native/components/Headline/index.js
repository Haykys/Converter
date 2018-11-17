// external libs
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

const styles = {
  headlineText: {
    fontSize: 30,
    color: 'black',
  },
}

const Container = ({ children }) => (
  <View>
    <Text style={styles.headlineText}>{children}</Text>
  </View>
)

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
