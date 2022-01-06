import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RouteSwitcher from './Components/RouteSwitcher/RouteSwitcher';
import { GET_DATA, GET_CURRENCIES } from './GraphQL/Queries'
import { initializeApollo } from './GraphQL/initializeApollo'
import { connect } from 'react-redux'
import { setProducts } from './redux/actions/products'
import { setCategories, setActiveCategory, setShowDescription } from './redux/actions/categories';
import { addProduct, increment, decrement, setPrice, toggleCart } from './redux/actions/cart'
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
    const { setCategories, setCurrencies, setProducts } = this.props
    res.then(res => {
      const categories = res.data.categories.map(categories => categories.name)
      const allProducts = [].concat.apply([], res.data.categories.map(categories => categories.products));
      categories.unshift("all")
      setCategories(categories)
      setProducts(allProducts)
    })
    currencies.then(res => {
      setCurrencies(res.data.currencies)
    })
  }

  render() {
    const { categories, activeCategoryIndex,
      setShowDescription, setActiveCategory,
      counter, prices, chosenProducts,
      addProduct, increment, decrement,
      currentCurrency, setCurrentCurrency,
      showDescription, products, isOpen,
      currencies, setPrice, toggleCart } = this.props

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
            decrement={decrement}
            currentCurrency={currentCurrency}
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setPrice={setPrice}
            toggleCart={toggleCart}
          />
          <section className={isOpen ? "background" : "content"}>
            <RouteSwitcher categories={categories}
              activeCategoryIndex={activeCategoryIndex}
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              products={products}
              chosenProducts={chosenProducts}
              setPrice={setPrice}
              addProduct={addProduct}
              increment={increment}
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
    isOpen: state.cart.isOpen,
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
  toggleCart,
  decrement,
  setCurrencies,
  setCurrentCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
