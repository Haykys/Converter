import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, ScrollView, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers, pure } from 'recompose'
// components
import Container from '../components/Container'
import Headline from '../components/Headline'
import ListItem from '../components/ListItem'
import LastConverted from '../components/LastConverted'
// actions
import { loadConversions } from '../converter/actions'

const withHistory = compose(
  connect(
    state => ({
      conversions: state.history.conversions,
      conversionRates: state.history.conversionRates,
    }),
    { loadConversions },
  ),
  withHandlers({
    handleLoadConversions: props => (base, quoted) => {
      props.loadConversions(base, quoted)
      props.navigation.goBack(null)
    },
  }),
  pure,
)

const renderHistory = props => (
  <Container>
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="default" translucent={false} />
      <Headline>Select Conversion</Headline>
      <FlatList
        data={props.conversions}
        renderItem={({ item }) => (
          <ListItem
            history={true}
            text={item.base}
            textSecondary={item.quoted}
            onPress={() => props.handleLoadConversions(item.base, item.quoted)}
          />
        )}
        keyExtractor={item => item.quoted} // TODO add id to object
      />
      <Headline>Past Conversion Rates</Headline>
      <FlatList
        data={props.conversionRates}
        renderItem={({ item }) => (
          <LastConverted
            base={item.base}
            quote={item.quoted}
            date={item.date}
            conversionRate={item.conversionRate}
          />
        )}
        keyExtractor={item => item.quoted} // TODO add id to object
      />
    </ScrollView>
  </Container>
)

renderHistory.propTypes = {
  conversions: PropTypes.arrayOf(PropTypes.object),
  conversionRates: PropTypes.arrayOf(PropTypes.object),
  handleLoadConversions: PropTypes.func,
}

export default withHistory(renderHistory)
