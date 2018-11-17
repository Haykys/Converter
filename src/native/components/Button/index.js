import PropTypes from 'prop-types'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const styles = {
  container: {
    alignItems: 'center',
    margin: 10,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  icon: {
    width: 19,
    marginRight: 11,
  },
  text: {
    color: 'black',
    fontSize: 14,
    margin: 10,
    fontWeight: '300',
  },
}

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
)

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
}

export default Button
