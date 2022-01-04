const initialState = {
    chosenProducts: {},
    prices: {},
    counter: {},
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRICE': {
            return {
                ...state,
                prices: { ...state.prices, [action.productKey]: action.payload }
            }
        }
        case 'ADD_PRODUCT': {
            return {
                ...state,
                chosenProducts: { ...state.chosenProducts, [action.productKey]: action.payload }
            }
        }
        case 'INCREMENT': {
            return {
                ...state,
                counter: { ...state.counter, [action.productKey]: action.payload }
            }
        }
        // case 'REMOVE_PRODUCT': {
        //     return {
        //         ...state,
        //         chosenProducts: [...state.chosenProducts.filter(product => product !== action.payload)]
        //     }
        // }
        case 'DECREMENT': {
            return {
                ...state,
                counter: { ...state.counter, [action.productKey]: action.payload }
            }
        }
        default:
            return state
    }
}
export default cart