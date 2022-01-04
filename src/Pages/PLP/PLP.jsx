import React from 'react'
import style from './PLP.module.css'
import { Link } from 'react-router-dom'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
class PLP extends React.Component {
    addToCart = (product, productKey, attributes, price) => {
        const { addProduct, setPrice, increment, counter } = this.props
        if (product.inStock) {
            let extraKey = attributes.map(attribute =>
                attribute.id + 0).join().replace(/[, ]+/g, '')

            addProduct(productKey + extraKey, product)
            setPrice("add", productKey + extraKey, price, counter[productKey])
            increment(counter[productKey + extraKey], productKey + extraKey)

        }
    }
    render() {
        const { categories, activeCategoryIndex, setShowDescription,
            currentCurrency, products } = this.props
        return (
            <>
                <h1 className={style.title}>{categories[activeCategoryIndex]}</h1>
                <div className={style.wrapper}>
                    {products.map((product, index) => <div key={product.id} className={style.container} id={!product.inStock ? style.blur : ""}>
                        <div className={style.add} onClick={this.addToCart.bind(this, product, product.id, product.attributes,
                            Object.values(product.prices[0])[1])}></div>
                        <Link key={product.id} to={"/ProductDescription"} state={product}>
                            <div className={style.product} onClick={() => setShowDescription(true)}>
                                <img src={product.gallery && product.gallery[0]} alt="product" className={style.img} />
                                <p className={style.name}>{product.brand}{" "}{product.name}</p>
                                <p className={style.price}>
                                    {`${currentCurrency}${product.prices && Object.values(getPriceByCurrency(product.prices, currentCurrency)[0])[1]}`}
                                </p>
                                {!product.inStock && <p className={style.out}>out of stock</p>}
                            </div></Link></div>)}
                </div>
            </>
        )
    }
}

export default PLP