export const setCurrencySymbol = (currency) => {
    switch (currency) {
        case 'USD': return "$";
        case 'GBP': return "£";
        case 'JPY': return "¥";
        case 'AUD': return "A$";
        case 'RUB': return "₽";
        default: return "$";
    }
}