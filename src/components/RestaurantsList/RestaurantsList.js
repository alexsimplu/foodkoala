import React, { useState, useEffect } from 'react';
import firebase from '../../config/Firebase/Firebase';

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
                    result.push(data);
                })

                setRestaurants(result)
            })
    }

    useEffect(() => {
        getRestaurants();
    }, [])

    console.log(restaurants)
    return (
        <div>
            restaurants list
        </div>
    )
}

export default RestaurantsList;

