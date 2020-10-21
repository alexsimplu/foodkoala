import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import style from './Restaurant.css'

const Restaurant = ({ restaurant }) => {
    const { name, description, id } = restaurant
    return (
        <Jumbotron className="restaurant-entity">
            <h1>{name}</h1>
            <p>{description}</p>
            <p>
                <Button href={`/restaurants/${id}/products`} variant="dark">See products</Button>
            </p>
        </Jumbotron>
    )
}

export default Restaurant
