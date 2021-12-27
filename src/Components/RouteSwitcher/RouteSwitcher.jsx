import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import CartPage from '../../Pages/CartPage/CartPage'
import PDP from '../../Pages/PDP/PDP'
import PLP from '../../Pages/PLP/PLP'

class RouteSwitcher extends React.Component {
    render() {
        const { totalPrice, chosenProducts,
            uniqueChosenProducts, increment,
            decrement, counter, addProduct,
            removeProduct, currentCurrency,
            activeAttributes, setActiveAttribute,
            categories, activeCategoryIndex, products,
            showDescription, setShowDescription } = this.props
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/ProductList" />} />
                <Route path="/Cart" element={<CartPage
                    totalPrice={totalPrice}
                    chosenProducts={chosenProducts}
                    uniqueChosenProducts={uniqueChosenProducts}
                    increment={increment}
                    decrement={decrement}
                    counter={counter}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    currentCurrency={currentCurrency}
                    activeAttributes={activeAttributes}
                />}
                />
                <Route path="/ProductDescription" element={<PDP addProduct={addProduct}
                    increment={increment}
                    counter={counter}
                    currentCurrency={currentCurrency}
                    activeAttributes={activeAttributes}
                    setActiveAttribute={setActiveAttribute}
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
                    activeAttributes={activeAttributes}
                    setActiveAttribute={setActiveAttribute}
                />} />
            </Routes>
        )
    }
}

export default RouteSwitcher