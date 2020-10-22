import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { NavLink, Link, useLocation } from 'react-router-dom';
import style from './Restaurant.css'

const Restaurant = ({ restaurant }) => {
    const { name, description, id } = restaurant
    return (
        <Jumbotron className="restaurant-entity">
            <h1>{name}</h1>
            <p>{description}</p>
            <p>
                <SrNavLink to={`/restaurants/${id}/products`}>See products</SrNavLink>
            </p>
        </Jumbotron>
    )
}

function SrNavLink({ children, ...rest}) {
    const location = useLocation();

    return (
        <NavLink {...rest}>
            { children }
            { location.pathname === rest.to && <span className="sr-only">(current)</span> }
        </NavLink>
    );
}

export default Restaurant
