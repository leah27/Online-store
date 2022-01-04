import React from 'react'
import style from './PDP.module.css'
import { withRouter } from '../../Hocs/withRouter'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
import { Parser } from 'html-to-react'
class PDP extends React.Component {
    state = { activeImgIndex: 0 }
    addToCart = (product, productKey, price) => {
        const { setPrice, addProduct, increment, counter } = this.props
        const { activeImgIndex, ...rest } = this.state
        let extraKey = Object.keys(rest).map(function (key, i) {
            return key + Object.values(rest)[i]
        }).join().replace(/[, ]+/g, '')
        if (product.inStock) {
            if (rest && Object.keys(rest).length === product.attributes.length) {
                setPrice("add", productKey + extraKey, price, counter[productKey + extraKey])
                addProduct(productKey + extraKey, product)
                increment(counter[productKey + extraKey], productKey + extraKey)
            }
        }
    }
    render() {
        const data = this.props.location.state
        const { currentCurrency } = this.props
        return (
            <>
                <div className={style.container}>
                    <div className={style.gallery}>
                        {data.gallery && data.gallery.map((img, index) =>
                            <img key={index} src={img} className={this.state.activeImgIndex === index ? style.large : style.small}
                                alt="product" onClick={() => this.setState({ ...this.state, activeImgIndex: index })} />
                        )}
                    </div>
                    <div className={style.description}>
                        <h2 className={style.title}>{data.brand}</h2>
                        <p className={style.product}>{data.name}</p>
                        {data.attributes && data.attributes.map(attribute => <React.Fragment key={attribute.id}>
                            <span className={style.attribute}>{attribute.name}</span>
                            <div className={style.buttons}>
                                {attribute.items.map((button, index) =>
                                    <button key={`${attribute.id}` + index} style={{ backgroundColor: button.value }}
                                        onClick={() => this.setState({ ...this.state, [`${attribute.id}`]: index })}
                                        id={this.state[`${attribute.id}`] === index ? attribute.type === 'swatch' ? style.activeColor : style.active : ""}
                                        className={style.button}>{attribute.type !== 'swatch' && button.value}</button>)}
                            </div></React.Fragment>)}
                        <span className={style.priceLabel}>price:</span>
                        <div className={style.price}>
                            {`${currentCurrency}${data.prices && Object.values(getPriceByCurrency(data.prices, currentCurrency)[0])[1]}`}
                        </div>
                        <button className={style.add} onClick={this.addToCart.bind(this, data, data.id,
                            Object.values(data.prices[0])[1]
                        )}>
                            add to cart
                        </button>
                        <div className={style.text}>{Parser().parse(data.description)}</div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(PDP)