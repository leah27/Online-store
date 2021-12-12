const initialState = {
    chosenProducts: [],
    totalPrice: 0,
    counter: 0
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            return {
                ...state,
                chosenProducts: [...state.chosenProducts, action.payload]
            }
        }
        case 'INCREMENT': {
            return {
                ...state,
                counter: action.payload
            }
        }
        case 'REMOVE_PRODUCT': {
            return {
                ...state,
                chosenProducts: [...state.chosenProducts.filter(product => product !== action.payload)]
            }
        }
        case 'DECREMENT': {
            return {
                ...state,
                counter: action.payload
            }
        }
        default:
            return state
    }
}

export default cart