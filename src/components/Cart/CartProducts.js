import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

import {CartItem} from './CartItem';
//import styles from './CartProducts.module.scss';

const CartProducts = () => {

    const [productsList] = useContext(CartContext);

    return ( 
        <div >
            <div className="card card-body border-0">

                {
                    productsList.map(product =>  <CartItem key={product.id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;