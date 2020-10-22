import React from 'react'
import ProductsList from '../../components/ProductsList/ProductsList'

const Products = props => {

    const restaurantId = props.match.params.restaurant_id
    
    return <ProductsList restaurantId={restaurantId}/>
} 

export default Products
