import React from 'react'
import style from './PLP.module.css'
import { Link } from 'react-router-dom'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
class PLP extends React.Component {
    addToCart = (product, inStock) => {
        if (inStock) {
            this.props.addProduct(product)
            this.props.increment(this.props.counter)
        }
    }
    render() {
        return (
            <>
                <h1 className={style.title}>{this.props.categories[this.props.activeCategoryIndex]}</h1>
                <div className={style.wrapper}>
                    {this.props.products.map(product => <div key={product.id} className={style.container} id={!product.inStock ? style.blur : ""}>
                        <div className={style.add} onClick={this.addToCart.bind(this, product, product.inStock)}></div>
                        <Link key={product.id} to={"/ProductDescription"} state={product}>
                            <div className={style.product} onClick={() => this.props.setShowDescription(true)}>
                                <img src={product.gallery && product.gallery[0]} alt="product" className={style.img} />
                                <p className={style.name}>{product.brand}{" "}{product.name}</p>
                                <p className={style.price}>
                                    {`${this.props.currentCurrency}${product.prices && Object.values(getPriceByCurrency(product.prices, this.props.currentCurrency)[0])[1]}`}
                                </p>
                                {!product.inStock && <p className={style.out}>out of stock</p>}
                            </div></Link></div>)}
                </div>
            </>
        )
    }
}

export default PLP