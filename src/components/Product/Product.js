import React, { useContext, useState } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import {CartContext} from '../Cart/CartContext'
import {computeTotalPrice} from '../Cart/CartUtils';
const Product = ({ product, restaurantId }) => {
    const [productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout] = useContext(CartContext);
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
    const [prodQuantity, setProdQuantity] = useState(numberOfItemsById(id));
    const normalize = name => {
        let imageRef = name.split(' ').map(name => name.toLowerCase()).join('-')
        imageRef = imageRef.substring(
            0, imageRef[imageRef.length - 1] === '-' ? imageRef.length - 1 : imageRef.length
        )
        return imageRef
    }
    

    const addToCart = () => {
        let itemExistInCar = false;
        productsList.forEach(cp => {
            if (cp.id == id) {
              cp.quantity = cp.quantity + 1;
              itemExistInCar = true;
            }
          });

        if(!itemExistInCar){
            const newItem = {...product, restaurantId, quantity:1};
            setProductsList(initial => [...initial, newItem]);
        }
        setProdQuantity(numberOfItemsById(id));
        let prodPrice = +price;
        setTotalPrice(totalPrice + prodPrice);
        setNumberOfItemes(numberOfItems + 1);
    }

    return (
        <Jumbotron className="restaurant-entity">
            <h1>{name}</h1>
            <img src={`${process.env.PUBLIC_URL}/images/${normalize(name)}.jpg`}/>
            <p>{`Price $${price}`}</p>
            <p>{`RestaurantID ${restaurantId} ProductId ${id}`}</p>
            <p>{`Available: ${available}`}</p>
            <p>
                <Button variant="dark"  onClick={addToCart}>Add To Cart</Button>
            </p>
        </Jumbotron>
    )
}

export default Product