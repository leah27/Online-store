import React from 'react'
import Currencies from './Currencies/Currencies'
import style from './Header.module.css'
import MyBag from './MyBag/MyBag'
import NavMenu from './NavMenu/NavMenu'

class Header extends React.Component {
    render() {
        const { categories, activeCategoryIndex,
            setActiveCategory, currentCurrency,
            currencies, setCurrentCurrency,
            addProduct, counter, totalPrice,
            chosenProducts, uniqueChosenProducts,
            increment, removeProduct, decrement,
            activeAttributes } = this.props
        return (
            <header className={style.header}>
                <NavMenu categories={categories}
                    activeCategoryIndex={activeCategoryIndex}
                    setActiveCategory={setActiveCategory} />

                <div className={style.actions}>
                    <Currencies currentCurrency={currentCurrency}
                        currencies={currencies}
                        setCurrentCurrency={setCurrentCurrency} />
                    <MyBag addProduct={addProduct}
                        counter={counter}
                        totalPrice={totalPrice}
                        chosenProducts={chosenProducts}
                        uniqueChosenProducts={uniqueChosenProducts}
                        increment={increment}
                        removeProduct={removeProduct}
                        decrement={decrement}
                        currentCurrency={currentCurrency}
                        activeAttributes={activeAttributes}
                    />
                </div>
            </header >
        )
    }
}

export default Header