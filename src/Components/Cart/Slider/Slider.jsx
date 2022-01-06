import React from 'react'
import style from './Slider.module.css'

class Slider extends React.Component {
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
        const { displayType, gallery } = this.props
        return (
            <div onMouseEnter={this.showArrows.bind(this)} onMouseLeave={this.hideArrows.bind(this)}
                className={displayType === "overlay" ? style.overlayImg : style.pageImg}>
                {this.state.inElement && <div className={displayType === "overlay" ? style.overlayLeftArrow
                    : style.pageLeftArrow} id={this.state.activeImgIndex === 0 ? style.hide : ""} onClick={this.moveLeft.bind(this)}></div>}
                <img src={gallery[this.state.activeImgIndex]} alt="product" />
                {this.state.inElement && <div className={displayType === "overlay" ? style.overlayRightArrow
                    : style.pageRightArrow} id={this.state.activeImgIndex === (gallery.length - 1) ? style.hide : ""} onClick={this.moveRight.bind(this)}></div>}
            </div>
        )
    }
}

export default Slider