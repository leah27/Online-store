import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import CartPage from '../../Pages/CartPage/CartPage'
import PDP from '../../Pages/PDP/PDP'
import PLP from '../../Pages/PLP/PLP'

class RouteSwitcher extends React.Component {
    render() {
        const { chosenProducts, setPrice,
            uniqueChosenProducts, increment,
            decrement, counter, addProduct,
            currentCurrency, products,
            categories, activeCategoryIndex,
            showDescription, setShowDescription } = this.props
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/ProductList" />} />
                <Route path="/Cart" element={<CartPage
                    chosenProducts={chosenProducts}
                    uniqueChosenProducts={uniqueChosenProducts}
                    increment={increment}
                    decrement={decrement}
                    counter={counter}
                    addProduct={addProduct}
                    setPrice={setPrice}
                    currentCurrency={currentCurrency}
                />}
                />
                <Route path="/ProductDescription" element={<PDP addProduct={addProduct}
                    increment={increment}
                    counter={counter}
                    currentCurrency={currentCurrency}
                    setPrice={setPrice}
                />} />
                <Route path="/ProductList" element={<PLP products={products}
                    categories={categories}
                    activeCategoryIndex={activeCategoryIndex}
                    showDescription={showDescription}
                    setShowDescription={setShowDescription}
                    addProduct={addProduct}
                    increment={increment}
                    counter={counter}
                    currentCurrency={currentCurrency}
                    setPrice={setPrice}
                />} />
            </Routes>
        )
    }
}

export default RouteSwitcher