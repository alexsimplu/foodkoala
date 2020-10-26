import React, { useEffect, useState } from 'react';

const initialValue = {
    numberOfItems: 0,
    totalPrice: 0,
}
export const CartContext = React.createContext(initialValue);

export const CartContextProvider = ({children}) => {
    
    const [productsList, setProductsList] = useState([]);
    const [numberOfItems, setNumberOfItemes] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkout, setCheckout] = useState(false);

    const addItem = (item) => {
        let itemExistInCar = false;
        productsList.forEach(cp => {
            if (cp.id == item.id && cp.restaurantId == item.restaurantId) {
              cp.quantity = cp.quantity + 1;
              itemExistInCar = true;
            }
          });

        if(!itemExistInCar){
            const newItem = {...item, quantity:1};
            setProductsList(initial => [...initial, newItem]);
        }
        let prodPrice = +(item.price);
        setTotalPrice(totalPrice + prodPrice);
        setNumberOfItemes(numberOfItems + 1);
        setCheckout(false);
    }

    const removeItem = (item) => {
        for (let i = 0; i < productsList.length; i ++){
            const cp = productsList[i];
            if (cp.id == item.id && cp.restaurantId == item.restaurantId) {
                cp.quantity = cp.quantity - 1;
                let price = cp.price;
                price = +price;
                setTotalPrice(totalPrice - price)
                setNumberOfItemes(numberOfItems - 1);
                if(cp.quantity === 0){
                    productsList.splice(i,1);
                }
                break;
            }
        }
        setProductsList(productsList);
    }
    
    return (
    <CartContext.Provider value={[productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout, addItem, removeItem]}>
        {children}
    </CartContext.Provider>
    );
}