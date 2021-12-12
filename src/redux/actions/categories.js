// const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'
// const SET_CATEGORIES = 'SET_CATEGORIES'

export const setActiveCategory = (category) => ({
    type: 'SET_ACTIVE_CATEGORY',
    payload: category
})

export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: categories
})

export const setShowDescription = (boolean) => ({
    type: 'SET_SHOW_DESCRIPTION',
    payload: boolean
})