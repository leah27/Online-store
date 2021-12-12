export const getPriceByCurrency = (prices, currentCurrency) => {
    return prices.filter(price => {
        switch (currentCurrency) {
            case '$': return price.currency === "USD";
            case '£': return price.currency === "GBP";
            case '¥': return price.currency === "JPY";
            case 'A$': return price.currency === "AUD";
            case '₽': return price.currency === "RUB";
        }
    })
}