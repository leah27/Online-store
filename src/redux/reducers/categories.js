const initialState = {
    activeCategoryIndex: 0,
    categories: [],
    showDescription: false
}

const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES': {
            return {
                ...state,
                categories: action.payload

            }
        }
        case 'SET_ACTIVE_CATEGORY': {
            return {
                ...state,
                activeCategoryIndex: action.payload
            }
        }
        case 'SET_SHOW_DESCRIPTION': {
            return {
                ...state,
                showDescription: action.payload
            }
        }
        default:
            return state
    }
}

export default categories