export const addProduct = (product) => ({
    type: "ADD_PRODUCT",
    payload: product
})

export const increment = (counter) => ({
    type: "INCREMENT",
    payload: counter + 1
})

export const removeProduct = (product) => ({
    type: "REMOVE_PRODUCT",
    payload: product
})

export const decrement = (counter) => ({
    type: "DECREMENT",
    payload: counter - 1
})