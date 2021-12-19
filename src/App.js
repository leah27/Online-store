import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RouteSwitcher from './Components/RouteSwitcher/RouteSwitcher';
import { GET_DATA, GET_CURRENCIES } from './GraphQL/Queries'
import { initializeApollo } from './GraphQL/initializeApollo'
import { connect } from 'react-redux'
import { setProducts } from './redux/actions/products'
import { setCategories, setActiveCategory, setShowDescription } from './redux/actions/categories';
import { addProduct, increment, removeProduct, decrement } from './redux/actions/cart'
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
    let uniqueChosenProducts = Array.from(new Set(this.props.chosenProducts.map(p => p.id)))
      .map(id => {
        return this.props.chosenProducts.find(p => p.id === id)
      })
    return (
      <>
        <div className="app">
          <Header categories={this.props.categories}
            activeCategoryIndex={this.props.activeCategoryIndex}
            setShowDescription={this.props.setShowDescription}
            setActiveCategory={this.props.setActiveCategory}
            counter={this.props.counter}
            totalPrice={this.props.totalPrice}
            chosenProducts={this.props.chosenProducts}
            uniqueChosenProducts={uniqueChosenProducts}
            addProduct={this.props.addProduct}
            increment={this.props.increment}
            removeProduct={this.props.removeProduct}
            decrement={this.props.decrement}
            currentCurrency={this.props.currentCurrency}
            currencies={this.props.currencies}
            setCurrentCurrency={this.props.setCurrentCurrency}
          />
          <section className="content">
            <RouteSwitcher categories={this.props.categories}
              activeCategoryIndex={this.props.activeCategoryIndex}
              showDescription={this.props.showDescription}
              setShowDescription={this.props.setShowDescription}
              products={this.props.products}
              chosenProducts={this.props.chosenProducts}
              uniqueChosenProducts={uniqueChosenProducts}
              addProduct={this.props.addProduct}
              increment={this.props.increment}
              removeProduct={this.props.removeProduct}
              decrement={this.props.decrement}
              counter={this.props.counter}
              currentCurrency={this.props.currentCurrency}
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
  setCurrencies,
  setCurrentCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
