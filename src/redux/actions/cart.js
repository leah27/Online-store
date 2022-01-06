export const setPrice = (eventType, productKey, price, counter) => ({
    type: "SET_PRICE",
    productKey: productKey,
    payload: eventType === "add" ? (counter === undefined ? price : price * (counter + 1))
        : price * (counter - 1)
})
export const addProduct = (productKey, product) => ({
    type: "ADD_PRODUCT",
    productKey: productKey,
    payload: product
})


export const increment = (counter, productKey) => ({
    type: "INCREMENT",
    productKey: productKey,
    payload: counter === undefined ? 1 : counter + 1
})

export const toggleCart = (boolean) => ({
    type: "TOGGLE_CART",
    payload: boolean
})

export const decrement = (counter, productKey) => ({
    type: "DECREMENT",
    productKey: productKey,
    payload: counter === undefined ? 1 : counter - 1
})


