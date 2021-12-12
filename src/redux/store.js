import { createStore, combineReducers } from 'redux'
import categories from './reducers/categories'
import products from './reducers/products'
import cart from './reducers/cart'
import currencies from './reducers/currencies'
const rootReducer = combineReducers({
    categories,
    products,
    cart,
    currencies
})

const store = createStore(rootReducer)

window.store = store
export default store

