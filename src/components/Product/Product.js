import React, { useContext, useState } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import {CartContext} from '../../context/CartContext'
import normalize from '../Utils/Normalize'

const Product = ({ product, restaurantId }) => {
    const cartContext = useContext(CartContext);
    const [productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout, addItem] = [...cartContext]
    const { name, available, price, id } = product;
    const numberOfItemsById = (id) => {
        let totalNumber = 0;        
        productsList.forEach(item => 
        {
            if(id === item.id){
                totalNumber = item.quantity;
            }
        });
        return totalNumber;
    }
    const [prodQuantity, setProdQuantity] = useState(numberOfItemsById(product.id));
      

    const addToCart = () => {
        addItem({...product, restaurantId:restaurantId});
        setProdQuantity(prodQuantity + 1);   
    }

    return (
        <Jumbotron className="restaurant-entity">
            <h1>{name}</h1>
            <img src={`${process.env.PUBLIC_URL}/images/${normalize(name)}.jpg`}/>
            <p>{`Price $${price}`}</p>
            <p>{`RestaurantID ${restaurantId} ProductId ${id}`}</p>
            <p>{`Available: ${available}`}</p>
            <p>{`Products in cart: ${prodQuantity}`}</p>
            <p>
                <Button variant="dark"  onClick={addToCart}>Add To Cart</Button>
            </p>
        </Jumbotron>
    )
}

export default Product