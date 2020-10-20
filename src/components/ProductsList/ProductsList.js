import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/Firebase'
import Product from '../Product/Product'

const ProductsList = props => {
    const { restaurantId } = props

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const db = firebase.firestore();
        const products = await db.collection('restaurants').doc(restaurantId).collection('ProductList')
        .get()
        .then(snapshot => {
                const result = [];

                snapshot.forEach(doc => {
                    const data = doc.data();
                    console.log(data)
                    result.push(data);
                })

                setProducts(result)
            })

            console.log(products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            {products.map(product => <Product key={product.name} product={product}/>)}
        </>
    )
}

export default ProductsList
