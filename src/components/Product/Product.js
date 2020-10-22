import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const Product = ({ product }) => {
    
    const { name, available, price } = product

    const normalize = name => {
        let imageRef = name.split(' ').map(name => name.toLowerCase()).join('-')
        imageRef = imageRef.substring(
            0, imageRef[imageRef.length - 1] === '-' ? imageRef.length - 1 : imageRef.length
        )
        return imageRef
    }

    return (
        <Jumbotron className="restaurant-entity">
            <h1>{name}</h1>
            <img src={`${process.env.PUBLIC_URL}/images/${normalize(name)}.jpg`}/>
            <p>{`Price $${price}`}</p>
            <p>{`Available: ${available}`}</p>
            <p>
                <Button variant="dark">Add To Cart</Button>
            </p>
        </Jumbotron>
    )
}

export default Product