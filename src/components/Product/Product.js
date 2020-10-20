import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const Product = ({ product }) => {
    const {name, available, price} = product
    return (
        <Jumbotron className="restaurant-entity">
            <h1>{`Product: ${name}`}</h1>
            <p>{`Price $${price}`}</p>
            <p>{`Available: ${available}`}</p>
            <p>
                <Button variant="primary">add to cart or sth</Button>
            </p>
        </Jumbotron>
    )
}

export default Product