import React from 'react'
import style from './Cart.module.css'
import Attributes from '../../Components/Attributes/Attributes'
import { getPriceByCurrency } from '../../Services/getPriceByCurrency'

class Cart extends React.Component {
    onProductAdd = (item) => {
        this.props.increment(this.props.counter)
        this.props.addProduct(item)
    }
    onProductRemove = (item) => {
        this.props.decrement(this.props.counter)
        if (this.props.chosenProducts.filter(p => p.id === item.id).length === 1) {
            this.props.removeProduct(item)
        } else {
            this.props.chosenProducts.push(this.props.chosenProducts.splice(this.props.chosenProducts.indexOf(item), 1)[0]);
            this.props.chosenProducts.pop()
        }
    }

    render() {
        return (
            <div>
                {this.props.displayType === "overlay" && <h3 className={style.title}>My bag,<span className={style.amount}>{' ' + this.props.chosenProducts.length} item{this.props.chosenProducts.length > 1 ? 's' : ""}</span></h3>}
                {this.props.uniqueChosenProducts.map(item => <div className={this.props.displayType === "overlay" ? style.overlayItem : style.pageItem} key={item.id}>
                    <div className={this.props.displayType === "overlay" ? style.overlayLeft : style.pageLeft}>
                        <p className={this.props.displayType === "overlay" ? style.overlayBrand : style.pageBrand}>{item.brand}</p>
                        <p className={this.props.displayType === "overlay" ? style.overlayProduct : style.pageProduct}>{item.name}</p>
                        <div className={this.props.displayType === "overlay" ? style.overlayPrice : style.pagePrice}>
                            {`${this.props.currentCurrency}${item.prices && Object.values(getPriceByCurrency(item.prices, this.props.currentCurrency)[0])[1]}`}
                        </div>
                        <div className={this.props.displayType === "overlay" ? style.overlayAttributeButtons : style.pageAttributeButtons}>
                            {item.attributes && <Attributes productId={item.id} activeAttributes={this.props.activeAttributes}
                            attributes={item.attributes} attributeCN="cartAttribute" activeCN={this.props.displayType === "overlay" ? "overlayActive" : "active"} />}
                        </div>
                    </div>
                    <div className={this.props.displayType === "overlay" ? style.overlayRight : style.pageRight}>
                        <button className={this.props.displayType === "overlay" ? style.overlayPlus : style.pagePlus} onClick={this.onProductAdd.bind(this, item)}></button>
                        <span className={this.props.displayType === "overlay" ? style.overlayCounter : style.pageCounter}>{this.props.chosenProducts.filter(p => p.id === item.id).length}</span>
                        <button className={this.props.displayType === "overlay" ? style.overlayMinus : style.pageMinus} onClick={this.onProductRemove.bind(this, item)}></button>
                        {item.gallery && <Slider displayType={this.props.displayType === "overlay" ? "overlay" : "page"} gallery={item.gallery} />}
                    </div>
                </div>)}
                {this.props.displayType === "overlay" && <div className={style.totalWrapper}>
                    <span className={style.total}>total</span>
                    <span className={style.sum}>
                        {`${this.props.currentCurrency}${parseFloat(this.props.chosenProducts.map(item => Object.values(getPriceByCurrency(item.prices, this.props.currentCurrency)[0])[1]).reduce((a, b) => a + b)).toFixed(2)}`}
                    </span>
                </div>}
            </div>
        )
    }
}

export default Cart

export class Slider extends React.Component {
    state = { activeImgIndex: 0, inElement: false }
    moveLeft = () => {
        this.setState({ ...this.state, activeImgIndex: this.state.activeImgIndex - 1 })
    }
    moveRight = () => {
        this.setState({ ...this.state, activeImgIndex: this.state.activeImgIndex + 1 })
    }
    showArrows = () => {
        this.setState({ ...this.state, inElement: true })
    }
    hideArrows = () => {
        this.setState({ ...this.state, inElement: false })
    }
    render() {
        return (
            <div onMouseEnter={this.showArrows.bind(this)} onMouseLeave={this.hideArrows.bind(this)}>
                {this.state.inElement && <div className={this.props.displayType === "overlay" ? style.overlayLeftArrow : style.pageLeftArrow} id={this.state.activeImgIndex == 0 ? style.hide : ""} onClick={this.moveLeft.bind(this)}></div>}
                <img src={this.props.gallery[this.state.activeImgIndex]} alt="product" className={this.props.displayType === "overlay" ? style.overlayImg : style.pageImg} />
                {this.state.inElement && <div className={this.props.displayType === "overlay" ? style.overlayRightArrow : style.pageRightArrow} id={this.state.activeImgIndex == (this.props.gallery.length - 1) ? style.hide : ""} onClick={this.moveRight.bind(this)}></div>}
            </div>
        )
    }
}

