import React from 'react'
import style from './CartPage.module.css'
import Cart from '../../Components/Cart/Cart'
import { withRouter } from '../../Hocs/withRouter'

class CartPage extends React.Component {
    render() {
        const { chosenProducts, increment,
            decrement, counter, addProduct,
            uniqueChosenProducts, currentCurrency,
            activeAttributes, setPrice } = this.props
        return (
            <div className={style.container}>
                <h1 className={style.title}>cart</h1>
                <Cart displayType="page" chosenProducts={chosenProducts}
                    increment={increment}
                    decrement={decrement}
                    counter={counter}
                    addProduct={addProduct}
                    uniqueChosenProducts={uniqueChosenProducts}
                    currentCurrency={currentCurrency}
                    activeAttributes={activeAttributes}
                    setPrice={setPrice}
                />
            </div>
        )
    }
}

export default withRouter(CartPage)