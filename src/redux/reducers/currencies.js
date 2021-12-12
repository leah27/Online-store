const initialState = {
    currentCurrency: '$',
    currencies: [{ "currencySymbol": "$", "currency": "USD" },
    { "currencySymbol": "£", "currency": "GBP" },
    { "currencySymbol": "¥", "currency": "JPY" },
    { "currencySymbol": "A$", "currency": "AUD" },
    { "currencySymbol": "₽", "currency": "RUB" },
    ]
}

const currencies = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENCIES': {
            return {
                ...state,
                currencies: action.payload

            }
        }
        case 'SET_CURRENT_CURRENCY': {
            return {
                ...state,
                currentCurrency: action.payload
            }
        }
        default:
            return state
    }
}

export default currencies