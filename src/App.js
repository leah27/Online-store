import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RouteSwitcher from './Components/RouteSwitcher/RouteSwitcher';
import { GET_DATA, GET_CURRENCIES } from './GraphQL/Queries'
import { initializeApollo } from './GraphQL/initializeApollo'
import { connect } from 'react-redux'
import { setProducts } from './redux/actions/products'
import { setCategories, setActiveCategory, setShowDescription } from './redux/actions/categories';
import { addProduct, increment, decrement, setPrice } from './redux/actions/cart'
import { setCurrencies, setCurrentCurrency } from './redux/actions/currencies';
const client = initializeApollo()
const res = client.query({
  query: GET_DATA,
  variables: {},
})
const currencies = client.query({
  query: GET_CURRENCIES,
  variables: {},
})
class App extends React.Component {
  componentDidMount() {
    const { setCategories, setCurrencies } = this.props
    res.then(res => {
      setCategories(res.data.categories.map(categories => categories.name))
    })
    currencies.then(res => {
      setCurrencies(res.data.currencies)
    })
  }
  componentDidUpdate() {
    const { setProducts, activeCategoryIndex } = this.props
    res.then(res => {
      setProducts(res.data.categories[activeCategoryIndex].products)
    })
  }
  render() {
    const { categories, activeCategoryIndex,
      setShowDescription, setActiveCategory,
      counter, prices, chosenProducts,
      addProduct, increment, decrement,
      currentCurrency, setCurrentCurrency,
      showDescription, products,
      currencies, setPrice } = this.props

    return (
      <>
        <div className="app">
          <Header categories={categories}
            activeCategoryIndex={activeCategoryIndex}
            setActiveCategory={setActiveCategory}
            counter={counter}
            prices={prices}
            chosenProducts={chosenProducts}
            addProduct={addProduct}
            increment={increment}
            // removeProduct={removeProduct}
            decrement={decrement}
            currentCurrency={currentCurrency}
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setPrice={setPrice}
          />
          <section className="content">
            <RouteSwitcher categories={categories}
              activeCategoryIndex={activeCategoryIndex}
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              products={products}
              chosenProducts={chosenProducts}
              setPrice={setPrice}
              addProduct={addProduct}
              increment={increment}
              // removeProduct={removeProduct}
              decrement={decrement}
              counter={counter}
              currentCurrency={currentCurrency}
            />
          </section>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    categories: state.categories.categories,
    activeCategoryIndex: state.categories.activeCategoryIndex,
    // showDescription: state.categories.showDescription,
    prices: state.cart.prices,
    counter: state.cart.counter,
    chosenProducts: state.cart.chosenProducts,
    activeAttributes: state.cart.activeAttributes,
    currencies: state.currencies.currencies,
    currentCurrency: state.currencies.currentCurrency
  }
}

const mapDispatchToProps = {
  setCategories,
  setActiveCategory,
  setProducts,
  setShowDescription,
  addProduct,
  increment,
  setPrice,
  decrement,
  setCurrencies,
  setCurrentCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
