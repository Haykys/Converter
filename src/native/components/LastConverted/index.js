import PropTypes from 'prop-types'
import React from 'react'
import { Text } from 'react-native'
import moment from 'moment'

const styles = {
  smallText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
}

const LastConverted = ({ date, base, quote, conversionRate }) => (
  <Text style={styles.smallText}>
    1 {base} = {conversionRate} {quote} as of{' '}
    {moment(date).format('YYYY-MM-DD')}
  </Text>
)

LastConverted.propTypes = {
  date: PropTypes.any,
  base: PropTypes.string,
  quote: PropTypes.string,
  conversionRate: PropTypes.string,
}

export default LastConverted
