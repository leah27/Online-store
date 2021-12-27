import React from 'react'
import style from './CartPage.module.css'
import Cart from '../../Components/Cart/Cart'
import { withRouter } from '../../Hocs/withRouter'

class CartPage extends React.Component {
    render() {
        const { chosenProducts, totalPrice, increment,
            decrement, counter, addProduct, removeProduct,
            uniqueChosenProducts, currentCurrency,
            activeAttributes } = this.props
        return (
            <div className={style.container}>
                <h1 className={style.title}>cart</h1>
                <Cart displayType="page" chosenProducts={chosenProducts}
                    totalPrice={totalPrice}
                    increment={increment}
                    decrement={decrement}
                    counter={counter}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    uniqueChosenProducts={uniqueChosenProducts}
                    currentCurrency={currentCurrency}
                    activeAttributes={activeAttributes}
                />
            </div>
        )
    }
}

export default withRouter(CartPage)