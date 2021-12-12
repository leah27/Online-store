import React from 'react'
// import { GetImagePath } from '../../Services/common'
import Currencies from './Currencies/Currencies'
import style from './Header.module.css'
import MyBag from './MyBag/MyBag'
import NavMenu from './NavMenu/NavMenu'

class Header extends React.Component {
    render() {
        return (
            <header className={style.header}>
                <NavMenu categories={this.props.categories}
                    activeCategoryIndex={this.props.activeCategoryIndex}
                    setActiveCategory={this.props.setActiveCategory} />

                <div className={style.actions}>
                    <Currencies currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}
                        setCurrentCurrency={this.props.setCurrentCurrency} />
                    <MyBag addProduct={this.props.addProduct}
                        counter={this.props.counter}
                        totalPrice={this.props.totalPrice}
                        chosenProducts={this.props.chosenProducts}
                        uniqueChosenProducts={this.props.uniqueChosenProducts}
                        increment={this.props.increment}
                        removeProduct={this.props.removeProduct}
                        decrement={this.props.decrement}
                        currentCurrency={this.props.currentCurrency}
                    />
                </div>
            </header >
        )
    }
}

export default Header