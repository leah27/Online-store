const initialState = {
    products: []
}

const products = (state = initialState, action) => {
    if (action.type === 'SET_PRODUCTS') {
        return {
            ...state,
            products: action.payload
        }
    } return state
}

export default products