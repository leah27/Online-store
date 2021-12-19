const initialState = {
    currentCurrency: '$',
    currencies: []
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