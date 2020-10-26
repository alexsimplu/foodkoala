import React, { useContext, useEffect, useState } from 'react';

import Product from '../Product/Product';
import { Row, Col } from 'react-bootstrap';

import { useForm } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import '../../App.css';

const database = firebase.firestore();
const initialFormValues =  {product: ''};

const EditProduct = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [error, setError] = useState();
  const { bindInput, values } = useForm(initialFormValues);
  const { user } = useContext(AuthContext);

  
  useEffect(() => {
    if(user) {
    database.collection('restaurants').get()
      .then(response => {
        const fetchedRestaurants = [];
        response.docs.forEach(document => {
          const fetchedRestaurant = {
            id: document.id,
            ...document.data()
          };
          fetchedRestaurants.push(fetchedRestaurant);
        });
        setRestaurants(fetchedRestaurants);
      })
      .catch(error => {
        setError(error);
      });}
  }, [user]);

  const selectRestaurant = (restaurant) => {
    
    setSelectedRestaurant(restaurant);
    console.log("restaurant "+restaurant.id);
    
    // console.log("selectedRestaurant:"+ JSON.stringify(selectedRestaurant));
    database.collection('restaurants').doc(restaurant.id).collection('ProductList').get()
      .then(response => {
        const fetchedProducts = [];
        response.forEach(document => {
          const fetchedProduct = {
            id: document.id,
            ...document.data()
          };
          fetchedProducts.push(fetchedProduct);
        });
        setProducts(fetchedProducts);
      })
      .catch(error => {
        setError(error);
      });
  }

  const selectProduct = (product) => {
    
    setSelectedProduct(product);
  
  }

//   async function handleChange(selectedProductId) {
//     const product = products.find(product => product.id === selectedProductId);
//     const todoRef = database.collection('ProductList').doc(selectedProductId);
//     console.log("todoRef:"+todoRef);
        
//     try {
//         await todoRef.update({
//             name: values.name,
//             image: values.image,
//             available: values.available,
//             price: values.price
//         });
        
//         console.log("Document successfully updated!");
//     } catch(error) {
//         // The document probably doesn't exist.
//         console.warn("Error updating document: ", error);
//     };
    
//     setProducts([...products]);
// }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        console.log("handleSubmit RestaurantId:"+ selectedRestaurant.id);
        console.log("handleSubmit ProductId:"+ selectedProduct.id);
        const docRef = await database.collection('restaurants').doc(selectedRestaurant.id).collection('ProductList').doc(selectedProduct.id).update({
            name: values.name,
            image: values.image,
            available: values.available,
            price: values.price
        });
        
        console.log("Document written with ID: ", docRef.id);
    } catch(error) {
        console.warn("Error adding document: ", error);
    };
    window.location.reload();
}




  return (
    <div className="edit-container">
      {error ? (
        <p>Ops, there is an error :(</p>
      ) : null}
      <div className="jumbotron jumbotron-fluid">
        <ul className="container">
            <h3>Restaurants</h3>
        {restaurants.map(restaurant => (
          <li key={restaurant.id} onClick={() => selectRestaurant(restaurant)}>
            <b>{restaurant.name}</b> 
          </li>
        ))}
      </ul>
      </div>
        
      {selectedRestaurant ? (
        <div className="jumbotron jumbotron-fluid">
        <ul className="container">
        <h3>Menus</h3>
          {products.map(product => (
            <li key={product.id} onClick={() => selectProduct(product)}>
              <b>{product.name}</b> | {`$${product.price}`} | {(product.available) ? "Available" : "Not Available"} 
            </li>
          ))}
        </ul>
        </div>
      ) : null}

       {console.log("here: "+selectedProduct.id)}     
      {selectedProduct.id ? (
        <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="h3">{selectedProduct.name}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Menu Name</label>
                            <input className="form-control" id="name" name="name" {...bindInput('name')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image Name</label>
                            <input className="form-control" id="image" name="image" {...bindInput('image')} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="price">Price</label>
                            <input className="form-control" id="price" name="price"{...bindInput('price')} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="available">Available</label>
                            <input className="form-control" id="available" name="available" {...bindInput('available')} />
                        </div>
                        <button className="btn btn-primary">Update Changes</button>
                    </form>
                </div>
            </div>) : null}
    </div>
  );
}

export default EditProduct;