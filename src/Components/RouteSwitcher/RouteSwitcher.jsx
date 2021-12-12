import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import CartPage from '../../Pages/CartPage/CartPage'
import PDP from '../../Pages/PDP/PDP'
import PLP from '../../Pages/PLP/PLP'

class RouteSwitcher extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/ProductList" />} />
                <Route path="/Cart" element={<CartPage
                    totalPrice={this.props.totalPrice}
                    chosenProducts={this.props.chosenProducts}
                    uniqueChosenProducts={this.props.uniqueChosenProducts}
                    increment={this.props.increment}
                    decrement={this.props.decrement}
                    counter={this.props.counter}
                    addProduct={this.props.addProduct}
                    removeProduct={this.props.removeProduct}
                    currentCurrency={this.props.currentCurrency}
                />}
                />
                <Route path="/ProductDescription" element={<PDP addProduct={this.props.addProduct}
                    increment={this.props.increment}
                    counter={this.props.counter}
                    currentCurrency={this.props.currentCurrency}
                />} />
                <Route path="/ProductList" element={<PLP products={this.props.products}
                    categories={this.props.categories}
                    activeCategoryIndex={this.props.activeCategoryIndex}
                    showDescription={this.props.showDescription}
                    setShowDescription={this.props.setShowDescription}
                    addProduct={this.props.addProduct}
                    increment={this.props.increment}
                    counter={this.props.counter}
                    currentCurrency={this.props.currentCurrency}
                />} />
            </Routes>
        )
    }
}

export default RouteSwitcher