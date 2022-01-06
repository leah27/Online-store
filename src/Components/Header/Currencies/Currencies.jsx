import React from 'react'
import style from './Currencies.module.css'
import { setCurrencySymbol } from '../../../Services/setCurrencySymbol'
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
        window.addEventListener('click', this.handleOutsideClick)
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick)
    }
    render() {
        const { currentCurrency, currencies, setCurrentCurrency } = this.props
        return (
            <div ref={this.currencyRef}>
                <div className={this.state.showCurrencies ? style.listShown : style.currency} onClick={this.toggleList}>
                    {currentCurrency}
                    {this.state.showCurrencies && <div className={style.currencyList}>
                        {currencies.map((currency, index) => <li key={index} onClick={() => setCurrentCurrency(setCurrencySymbol(currency))}>{setCurrencySymbol(currency) + ' ' + currency}</li>)}
                    </div>}
                </div>
            </div>
        )
    }
}

export default Currencies

