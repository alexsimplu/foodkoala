import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/Firebase'
import Product from '../Product/Product'
import { Row, Col } from 'react-bootstrap'

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
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Row xs={1} lg={2}>
            {products.map(product => <Col><Product key={product.name} product={product}/></Col>)}
        </Row>
    )
}

export default ProductsList
