import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RouteSwitcher from './Components/RouteSwitcher/RouteSwitcher';
import { GET_DATA, GET_CURRENCIES } from './GraphQL/Queries'
import { initializeApollo } from './GraphQL/initializeApollo'
import { connect } from 'react-redux'
import { setProducts } from './redux/actions/products'
import { setCategories, setActiveCategory, setShowDescription } from './redux/actions/categories';
import { addProduct, increment, removeProduct, decrement, setActiveAttribute } from './redux/actions/cart'
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
    res.then(res => {
      this.props.setCategories(res.data.categories.map(categories => categories.name))
    })
    currencies.then(res => {
      this.props.setCurrencies(res.data.currencies)
    })
  }
  componentDidUpdate() {
    res.then(res => {
      this.props.setProducts(res.data.categories[this.props.activeCategoryIndex].products)
    })
  }
  render() {
    const { categories, activeCategoryIndex,
      setShowDescription, setActiveCategory,
      counter, totalPrice, chosenProducts,
      addProduct, increment, removeProduct,
      decrement, currentCurrency, setCurrentCurrency,
      activeAttributes, showDescription, products,
      setActiveAttribute, currencies } = this.props
    let uniqueChosenProducts = Array.from(new Set(chosenProducts.map(p => p.id)))
      .map(id => {
        return chosenProducts.find(p => p.id === id)
        // new Set(chosenProducts.find(p => p.id === id).attributes.map(attribute => attribute))
      })
    return (
      <>
        <div className="app">
          <Header categories={categories}
            activeCategoryIndex={activeCategoryIndex}
            setShowDescription={setShowDescription}
            setActiveCategory={setActiveCategory}
            counter={counter}
            totalPrice={totalPrice}
            chosenProducts={chosenProducts}
            uniqueChosenProducts={uniqueChosenProducts}
            addProduct={addProduct}
            increment={increment}
            removeProduct={removeProduct}
            decrement={decrement}
            currentCurrency={currentCurrency}
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            activeAttributes={activeAttributes}
          />
          <section className="content">
            <RouteSwitcher categories={categories}
              activeCategoryIndex={activeCategoryIndex}
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              products={products}
              chosenProducts={chosenProducts}
              activeAttributes={activeAttributes}
              setActiveAttribute={setActiveAttribute}
              uniqueChosenProducts={uniqueChosenProducts}
              addProduct={addProduct}
              increment={increment}
              removeProduct={removeProduct}
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
    showDescription: state.categories.showDescription,
    totalPrice: state.cart.totalPrice,
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
  removeProduct,
  decrement,
  setActiveAttribute,
  setCurrencies,
  setCurrentCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
