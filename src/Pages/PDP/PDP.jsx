import React from 'react'
import style from './PDP.module.css'
import { withRouter } from '../../Hocs/withRouter'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
import Attributes from '../../Components/Attributes/Attributes'
import { Parser } from 'html-to-react'
class PDP extends React.Component {
    state = { activeImgIndex: 0 }
    addToCart = (productId) => {
        console.log(this.props.activeAttributes)
        if (this.props.location.state.inStock && this.props.activeAttributes !== (undefined || null)
            && Object.keys(this.props.activeAttributes).length > 0
            && this.props.activeAttributes[`${productId}`] !== (undefined || null)
            && Object.keys(this.props.activeAttributes[`${productId}`]).length > 0) {
            this.props.addProduct(this.props.location.state)
            this.props.increment(this.props.counter)
        }
    }
    render() {
        const data = this.props.location.state
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
                        {data.attributes && <Attributes productId={data.id} setActiveAttribute={this.props.setActiveAttribute} activeAttributes={this.props.activeAttributes}
                            attributes={data.attributes} attributeCN="attribute" buttonsCN="buttons" buttonCN="button" activeCN="active" />}
                        <span className={style.priceLabel}>price:</span>
                        <div className={style.price}>
                            {`${this.props.currentCurrency}${data.prices && Object.values(getPriceByCurrency(data.prices, this.props.currentCurrency)[0])[1]}`}
                        </div>
                        <button className={style.add} onClick={this.addToCart.bind(this, data.id)}>add to cart</button>
                        <div className={style.text}>{Parser().parse(data.description)}</div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(PDP)