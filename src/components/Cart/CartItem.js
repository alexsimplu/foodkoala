import React, { useContext, useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from './Icons'
import { CartContext } from '../../context/CartContext';


export const CartItem = ({product}) => {

    const  [productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout, addItem, removeItem] = useContext(CartContext);
    const [quantity, setQuantity] = useState(product.quantity)
    const increase =  () => {        
        addItem(product);
        setQuantity(quantity + 1);
    }

    const removeProduct = (product) => {
        removeItem(product);
        setQuantity(quantity - 1);
    }
    const normalize = name => {
        let imageRef = name.split(' ').map(name => name.toLowerCase()).join('-')
        imageRef = imageRef.substring(
            0, imageRef[imageRef.length - 1] === '-' ? imageRef.length - 1 : imageRef.length
        )
        return imageRef
    }

    return ( 
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                alt={product.name}
                style={{margin: "0 auto", maxHeight: "50px"}} 
                src={`${process.env.PUBLIC_URL}/images/${normalize(product.name)}.jpg`} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">Price: {product.price} </p>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">Qty: {quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                 <button 
                 onClick={() => increase(product)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusCircleIcon width={"20px"}/>
                 </button>

                 {
                     product.quantity > 1 &&
                     <button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </button>
                 }

                {
                     product.quantity === 1 &&
                     <button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </button>
                 }
                 
            </div>
        </div>
     );
}