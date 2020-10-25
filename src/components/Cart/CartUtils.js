export const computeTotalPrice = (products) => {
    let price = 0;
    products.forEach(item => {price += item.price * item.quantity});
    return price;
}