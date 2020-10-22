import React, { useState, useEffect } from 'react'
import firebase from '../../Firebase'
import Restaurant from '../Restaurant/Restaurant'


const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState([]);

    const getRestaurants = async () => {
        const db = firebase.firestore();
        const restaurants = await db.collection('restaurants')
        .get()
        .then(snapshot => {
                const result = [];

                snapshot.forEach(doc => {
                    const data = doc.data();
                    result.push({...data, id: doc.id});
                })

                setRestaurants(result)
            })
    }

    useEffect(() => {
        getRestaurants();
    }, [])

    console.log(restaurants)
    return (
        <>
            { restaurants.map(restaurant => <Restaurant key={restaurant.name} restaurant={restaurant}/>) }
        </>
    )
}

export default RestaurantsList;

