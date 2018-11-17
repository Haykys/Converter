import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Button } from 'react-native'

import Converter from '../converter'
import CurrencyList from '../currencyList'
import History from '../history'

export default createStackNavigator({
  Converter: {
    screen: Converter,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button
          onPress={() => navigation.navigate('History')}
          title="History"
          color="black"
        />
      ),
    }),
  },
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title,
    }),
  },
  History: {
    screen: History,
  },
})
