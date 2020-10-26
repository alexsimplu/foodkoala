import React, { useContext, useState } from 'react';

import CartProducts from '../../components/Cart/CartProducts';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    
    const cartContext = useContext(CartContext);
    const [productsList, setProductsList, numberOfItems, setNumberOfItemes, totalPrice, setTotalPrice, checkout, setCheckout] = cartContext;
    const handleCheckout = () => {
        setCheckout(true);
        setNumberOfItemes(0);
        setTotalPrice(0);
        setProductsList([]);
    }
    //const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    
    return ( 
        <div title="Cart" description="This is the Cart page" >
            <div >
                <div className="text-center mt-5">
                    <h1>My Cart</h1>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            productsList.length > 0 ?
                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Thank you for your oreder!!</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                    </div>
                    {
                        productsList.length > 0 && 
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{numberOfItems}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{totalPrice}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>ORDER</button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
     );
}
 
export default Cart;