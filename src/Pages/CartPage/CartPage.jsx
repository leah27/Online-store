import React from 'react'
import style from './CartPage.module.css'
import Cart from '../../Components/Cart/Cart'
import { withRouter } from '../../Hocs/withRouter'

class CartPage extends React.Component {
    render() {
        //console.log(this.props.chosenProducts)
        //const chosenProducts = this.props.chosenProducts
        // const uniqueChosenProducts = Array.from(new Set(chosenProducts.map(p => p.id)))
        //     .map(id => {
        //         return chosenProducts.find(p => p.id === id)
        //     })
        return (
            <div className={style.container}>
                <h1 className={style.title}>cart</h1>
                <Cart displayType="page" chosenProducts={this.props.chosenProducts}
                    totalPrice={this.props.totalPrice}
                    increment={this.props.increment}
                    decrement={this.props.decrement}
                    counter={this.props.counter}
                    addProduct={this.props.addProduct}
                    removeProduct={this.props.removeProduct}
                    uniqueChosenProducts={this.props.uniqueChosenProducts}
                    currentCurrency={this.props.currentCurrency}
                />
            </div>
        )
    }
}

export default withRouter(CartPage)