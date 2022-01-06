import React from 'react'
import style from './MyBag.module.css'
import Cart from '../../Cart/Cart'
import { Link } from 'react-router-dom'

class MyBag extends React.Component {
    state = { showCart: false }
    cartRef = React.createRef();
    toggleCart = () => {
        const { chosenProducts } = this.props
        Object.values(chosenProducts).length < 3 && this.setState({ showCart: !this.state.showCart })
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
        window.addEventListener('click', this.handleOutsideClick)
    }
    componentDidUpdate() {
        const { chosenProducts, toggleCart } = this.props
        if (this.state.showCart && Object.values(chosenProducts).length > 0) {
            toggleCart(true)
        } else {
            toggleCart(false)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick)
    }
    render() {
        const { chosenProducts, counter, setPrice,
            addProduct, prices, increment, activeAttributes,
            decrement, currentCurrency } = this.props
        return (
            <div ref={this.cartRef}>
                <div className={style.bag} onClick={this.toggleCart}>
                    {Object.values(chosenProducts).length > 2 && <Link to={"/Cart"} state={Object.values(chosenProducts)}></Link>}
                    {Object.keys(chosenProducts).length > 0 && <span className={style.counter}>{Object.values(counter).reduce((a, b) => a + b, 0)}</span>}
                </div>
                {this.state.showCart && Object.values(chosenProducts).length > 0 &&
                    // <div className={style.background}>
                    <div className={style.cart}>
                        <div className={style.close} onClick={this.close}></div>
                        <Cart displayType="overlay" addProduct={addProduct}
                            counter={counter}
                            prices={prices}
                            chosenProducts={chosenProducts}
                            increment={increment}
                            decrement={decrement}
                            currentCurrency={currentCurrency}
                            activeAttributes={activeAttributes}
                            setPrice={setPrice}
                        />
                        <div className={style.buttons}>
                            <button className={`${style.button} ${style.view}`} onClick={this.close}><Link to={"/Cart"}>
                                view bag</Link></button>
                            <button className={`${style.button} ${style.checkout}`}>check out</button>
                        </div>
                    </div>
                    // </div>
                }
            </div>
        )
    }
}

export default MyBag