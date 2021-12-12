import React from 'react'
import style from './Currencies.module.css'

class Currencies extends React.Component {
    state = { showCurrencies: false }
    currencyRef = React.createRef()
    toggleList = () => {
        this.setState({ showCurrencies: !this.state.showCurrencies })
    }
    handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(this.currencyRef.current)) {
            this.setState({ showCurrencies: false })
        }
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleOutsideClick)
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleOutsideClick)
    }
    render() {
        return (
            <div ref={this.currencyRef}>
                <div className={this.state.showCurrencies ? style.listShown : style.currency} onClick={this.toggleList}>
                    {this.props.currentCurrency}
                    {this.state.showCurrencies && <div className={style.currencyList}>
                        {this.props.currencies.map((currency, index) => <li key={index} onClick={() => this.props.setCurrentCurrency(currency.currencySymbol)}>{Object.values(currency).join(' ')}</li>)}
                    </div>}
                </div>
            </div>
        )
    }
}

export default Currencies

