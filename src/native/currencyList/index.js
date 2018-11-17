// external libs
import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers, pure } from 'recompose'
// components
import ListItem from '../components/ListItem'
// actions
import { changeBaseCurrency, changeQuoteCurrency } from '../converter/actions'

const styles = {
  container: {
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
}

const withCurrencyList = compose(
  connect(
    state => ({
      rates: state.converter.rates,
    }),
    {
      changeBaseCurrency,
      changeQuoteCurrency,
    },
  ),
  withHandlers({
    handlePressCurrency: props => currency => {
      const { type } = props.navigation.state.params
      if (type === 'base') {
        props.changeBaseCurrency(currency)
      } else {
        props.changeQuoteCurrency(currency)
      }
      props.navigation.goBack(null)
    },
  }),
  pure,
)

const renderCurrencyList = props => (
  <View style={styles.container}>
    <StatusBar barStyle="default" translucent={false} />
    <TouchableOpacity onPress={() => props.handlePressCurrency('EUR')}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>EUR</Text>
      </View>
    </TouchableOpacity>
    <FlatList
      data={props.rates}
      renderItem={({ item }) => (
        <ListItem
          text={item.currency}
          onPress={() => props.handlePressCurrency(item.currency)}
        />
      )}
      keyExtractor={item => item.currency}
    />
  </View>
)

renderCurrencyList.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.object),
  handlePressCurrency: PropTypes.func,
}

export default withCurrencyList(renderCurrencyList)
