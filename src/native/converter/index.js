// external libs
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'
// components
import Container from '../components/Container'
import InputWithButton from '../components/InputWithButton'
import Button from '../components/Button'
import LastConverted from '../components/LastConverted'
import Headline from '../components/Headline'
// actions
import { getRates, swapCurrency, changeCurrencyAmount } from './actions'
import { saveConversion, saveConversionRate } from '../history/actions'

const withConverterScreen = compose(
  connect(
    state => ({
      baseCurrency: state.converter.baseCurrency,
      quoteCurrency: state.converter.quoteCurrency,
      amount: state.converter.amount,
      rates: state.converter.rates || [],
      selectedQuote: state.converter.selectedQuote,
      selectedBase: state.converter.selectedBase,
      time: state.converter.time,
    }),
    {
      getRates,
      swapCurrency,
      changeCurrencyAmount,
      saveConversion,
      saveConversionRate,
    },
  ),
  withHandlers({
    handlePressBaseCurrency: props => () => {
      props.navigation.navigate('CurrencyList', {
        title: 'Base Currency',
        type: 'base',
      })
    },
    handlePressQuoteCurrency: props => () => {
      props.navigation.navigate('CurrencyList', {
        title: 'Quote Currency',
        type: 'quote',
      })
    },
    handleSwapCurrency: props => () => {
      props.swapCurrency()
    },
    handleChangeAmount: props => amount => {
      props.changeCurrencyAmount(amount)
    },
    handleSaveConversion: props => (base, quote) => {
      props.saveConversion(base, quote)
    },
    handleSaveConversionRate: props => (base, quote, time, conversionRate) => {
      props.saveConversionRate(base, quote, time, conversionRate)
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getRates()
    },
  }),
  pure,
)

const renderConverterScreen = props => {
  let conversionRate = 'no data'
  if (props.selectedBase && props.quoteCurrency === 'EUR') {
    conversionRate = (1 / props.selectedBase.rate).toFixed(3)
  } else if (props.selectedQuote && props.selectedBase) {
    conversionRate = (
      props.selectedQuote.rate / props.selectedBase.rate
    ).toFixed(3)
  } else if (props.selectedQuote) {
    conversionRate = props.selectedQuote.rate
  }

  const quoteRateEUR =
    props.selectedQuote && (props.selectedQuote.rate * props.amount).toFixed(3)

  const quoteRateOther =
    props.quoteCurrency === 'EUR'
      ? props.selectedBase &&
        (props.amount / props.selectedBase.rate).toFixed(3)
      : props.selectedQuote &&
        props.selectedBase &&
        (
          (props.selectedQuote.rate / props.selectedBase.rate) *
          props.amount
        ).toFixed(3)

  return (
    <Container>
      <Headline>Converter App</Headline>
      <InputWithButton
        buttonText={props.baseCurrency}
        defaultValue={props.amount.toString()}
        keyboardType="numeric"
        onPress={props.handlePressBaseCurrency}
        onChangeText={props.handleChangeAmount}
      />
      <Button text="Reverse Currency" onPress={props.handleSwapCurrency} />
      <InputWithButton
        buttonText={props.quoteCurrency}
        editable={false}
        onPress={props.handlePressQuoteCurrency}
        value={props.baseCurrency === 'EUR' ? quoteRateEUR : quoteRateOther}
      />
      <LastConverted
        date={props.time}
        base={props.baseCurrency}
        quote={props.quoteCurrency}
        conversionRate={conversionRate}
      />
      <Button
        text="Save Conversion"
        onPress={() =>
          props.handleSaveConversion(props.baseCurrency, props.quoteCurrency)
        }
      />
      <Button
        text="Save Conversion Rate"
        onPress={() =>
          props.handleSaveConversionRate(
            props.baseCurrency,
            props.quoteCurrency,
            props.time,
            conversionRate,
          )
        }
      />
    </Container>
  )
}

renderConverterScreen.propTypes = {
  baseCurrency: PropTypes.any,
  quoteCurrency: PropTypes.any,
  time: PropTypes.any,
  amount: PropTypes.number,
  selectedBase: PropTypes.object,
  selectedQuote: PropTypes.object,
  handleSaveConversionRate: PropTypes.func,
  handleSaveConversion: PropTypes.func,
  handlePressQuoteCurrency: PropTypes.func,
  handleChangeAmount: PropTypes.func,
  handlePressBaseCurrency: PropTypes.func,
  handleSwapCurrency: PropTypes.func,
}

export default withConverterScreen(renderConverterScreen)
