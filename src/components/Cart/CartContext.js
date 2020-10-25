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
    
    return (
    <CartContext.Provider value={[productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout]}>
        {children}
    </CartContext.Provider>
    );
}