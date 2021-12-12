import React from 'react'
import style from './PDP.module.css'
import { withRouter } from '../../Hocs/withRouter'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'
import Attributes from '../../Components/Attributes/Attributes'
class PDP extends React.Component {
    state = { activeImgIndex: 0 }
    addToCart = () => {
        this.props.addProduct(this.props.location.state)
        this.props.increment(this.props.counter)
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
                        {data.attributes && <Attributes attributes={data.attributes} attributeCN="attribute" buttonsCN="buttons" buttonCN="button" activeCN="active" />}
                        <span className={style.priceLabel}>price:</span>
                        <div className={style.price}>
                            {`${this.props.currentCurrency}${data.prices && Object.values(getPriceByCurrency(data.prices, this.props.currentCurrency)[0])[1]}`}
                        </div>
                        <button className={style.add} onClick={this.addToCart.bind(this)}>add to cart</button>
                        <div className={style.text} dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(PDP)