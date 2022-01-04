import React from 'react'
import style from './Cart.module.css'
import Attributes from './Attributes/Attributes'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
import Slider from './Slider/Slider'
class Cart extends React.Component {
    onProductAdd = (productKey, price, amount) => {
        const { increment, setPrice } = this.props
        increment(amount, productKey)
        setPrice("add", productKey, price, amount)
    }
    onProductRemove = (productKey, price, amount) => {
        const { decrement, setPrice, counter, chosenProducts } = this.props
        setPrice("remove", productKey, price, amount)
        if (counter[productKey] === 1) {
            delete chosenProducts[productKey]
            delete counter[productKey]
        } else {
            decrement(amount, productKey)
        }
    }

    render() {
        const { displayType, chosenProducts, counter,
            currentCurrency, activeAttributes, prices } = this.props
        return (
            <div>
                {displayType === "overlay" && <h3 className={style.title}>My bag,
                    <span className={style.amount}>{' ' + Object.values(counter).reduce((a, b) => a + b, 0)} item
                        {Object.values(counter).reduce((a, b) => a + b, 0) > 1 ? 's' : ""}</span></h3>}
                {Object.values(chosenProducts).map((item, index) => <div className={displayType === "overlay" ? style.overlayItem : style.pageItem} key={index}>
                    <div className={displayType === "overlay" ? style.overlayLeft : style.pageLeft}>
                        <p className={displayType === "overlay" ? style.overlayBrand : style.pageBrand}>{item.brand}</p>
                        <p className={displayType === "overlay" ? style.overlayProduct : style.pageProduct}>{item.name}</p>
                        <div className={displayType === "overlay" ? style.overlayPrice : style.pagePrice}>
                            {`${currentCurrency}${item.prices && Object.values(getPriceByCurrency(item.prices, currentCurrency)[0])[1]}`}
                        </div>
                        <div className={displayType === "overlay" ? style.overlayAttributeButtons : style.pageAttributeButtons}>
                            {item.attributes && <Attributes productKey={Object.keys(chosenProducts)[index]} productId={item.id} activeAttributes={activeAttributes}
                                attributes={item.attributes} activeCN={displayType === "overlay" ? "overlayActive" : "active"} />}
                        </div>
                    </div>
                    <div className={displayType === "overlay" ? style.overlayRight : style.pageRight}>
                        <button className={displayType === "overlay" ? style.overlayPlus : style.pagePlus}
                            onClick={this.onProductAdd.bind(this, Object.keys(chosenProducts)[index],
                                Object.values(item.prices[0])[1],
                                Object.values(counter)[index])}></button>
                        <span className={displayType === "overlay" ? style.overlayCounter : style.pageCounter}>
                            {Object.values(counter)[index]}
                        </span>
                        <button className={displayType === "overlay" ? style.overlayMinus : style.pageMinus}
                            onClick={this.onProductRemove.bind(this, Object.keys(chosenProducts)[index],
                                Object.values(item.prices[0])[1],
                                Object.values(counter)[index])}></button>
                        {item.gallery && <Slider displayType={displayType === "overlay" ? "overlay" : "page"} gallery={item.gallery} />}
                    </div>
                    {displayType === "overlay" &&
                        <div className={style.totalWrapper}>
                            <span className={style.total}>total</span>
                            <span className={style.sum}>
                                {`${currentCurrency}`}{(Object.values(prices).reduce((a, b) => a + b, 0) *
                                    (Object.values(getPriceByCurrency(item.prices, currentCurrency)[0])[1] /
                                        Object.values(item.prices[0])[1])).toFixed(2)}
                            </span>
                        </div>}
                </div>)}
            </div>
        )
    }
}

export default Cart



