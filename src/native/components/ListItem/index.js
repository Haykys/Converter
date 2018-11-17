import PropTypes from 'prop-types'
import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const styles = {
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  separator: {
    backgroundColor: 'black',
    flex: 1,
    marginLeft: 20,
  },
}

const ListItem = ({ text, textSecondary, onPress, history = false }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.row}>
      <Text style={styles.text}>
        {history ? 'Base: ' : ''}
        {text}
      </Text>
      {history ? <Text style={styles.text}>Quote: {textSecondary}</Text> : null}
    </View>
  </TouchableHighlight>
)

ListItem.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  textSecondary: PropTypes.string,
  history: PropTypes.bool,
}

export default ListItem
