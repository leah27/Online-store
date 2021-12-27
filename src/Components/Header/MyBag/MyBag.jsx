import React from 'react'
import style from './MyBag.module.css'
import Cart from '../../Cart/Cart'
import { Link } from 'react-router-dom'

class MyBag extends React.Component {
    state = { showCart: false }
    cartRef = React.createRef();
    toggleCart = () => {
        this.props.uniqueChosenProducts.length < 3 && this.setState({ showCart: !this.state.showCart })
    }
    handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(this.cartRef.current)) {
            this.setState({ showCart: false })
        }
    }
    close = () => {
        this.setState({ showCart: false })
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleOutsideClick)
    }
    componentDidUpdate() {
        if (this.state.showCart && this.props.chosenProducts.length > 0) {
            document.querySelector('.content').classList.add('background')
        } else {
            document.querySelector('.content').classList.remove('background')
        }
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleOutsideClick)
    }
    render() {
        const { uniqueChosenProducts, chosenProducts, counter,
            addProduct, totalPrice, increment, removeProduct,
            decrement, currentCurrency, activeAttributes } = this.props
        return (
            <div ref={this.cartRef}>
                <div className={style.bag} onClick={this.toggleCart}>
                    {uniqueChosenProducts.length > 2 && <Link to={"/Cart"} state={chosenProducts}></Link>}
                    {counter > 0 && <span className={style.counter}>{counter}</span>}
                </div>
                {this.state.showCart && chosenProducts.length > 0 &&
                    <div className={style.background}>
                        <div className={style.cart}>
                            <div className={style.close} onClick={this.close}></div>
                            <Cart displayType="overlay" addProduct={addProduct}
                                counter={counter}
                                totalPrice={totalPrice}
                                chosenProducts={chosenProducts}
                                increment={increment}
                                removeProduct={removeProduct}
                                decrement={decrement}
                                uniqueChosenProducts={uniqueChosenProducts}
                                currentCurrency={currentCurrency}
                                activeAttributes={activeAttributes}
                            />
                            <div className={style.buttons}>
                                <button className={`${style.button} ${style.view}`} onClick={this.close}><Link to={"/Cart"}>
                                    view bag</Link></button>
                                <button className={`${style.button} ${style.checkout}`}>check out</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default MyBag