import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';

import Product from '../Product/Product'
import { Row, Col } from 'react-bootstrap'

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { useForm } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';

const initialFormValues = {product: ''};


export default function AddProduct(props) {
    let { restaurantId } = props;
    restaurantId = "3zemWOl1VUxBCFsWpbeL";
    console.log(restaurantId);
    const [products, setProducts] = useState([]);
    const { bindInput, values } = useForm(initialFormValues);
    const { user } = useContext(AuthContext);
    const db = firebase.firestore();

    useEffect(() => {
        if(user) {
            db.collection("restaurants").doc(restaurantId).collection('ProductList')
                     .get()
                     .then(snapshot => {
                        const result = [];
        
                        snapshot.forEach(doc => {
                            const data = doc.data();
                            console.log(data)
                            result.push(data);
                        })
        
                        setProducts(result)
                });   
        }     
    }, [db, user, restaurantId]);

    
    async function handleChange(productId) {
        const product = products.find(product => product.id === productId);
        const productRef = db.collection('restaurants').doc(restaurantId).collection('ProductList').doc(productId);
        
        // todo.status = todo.status === 'NOT_COMPLETED' ? 'COMPLETED' : 'NOT_COMPLETED'
        
        try {
            await productRef.update({
                status: product.status
            });
            
            console.log("Document successfully updated!");
        } catch(error) {
            // The document probably doesn't exist.
            console.warn("Error updating document: ", error);
        };
        
        setProducts([...products]);
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const docRef = await db.collection('restaurants').doc(restaurantId).collection('ProductList').add({
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
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-
                    3">Add new Menu</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Menu Name</label>
                            <input className="form-control" {...bindInput('name')} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="image">Image Name</label>
                            <input className="form-control" {...bindInput('image')} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="price">Price</label>
                            <input className="form-control" {...bindInput('price')} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="available">Available</label>
                            <input className="form-control" {...bindInput('available')} />
                        </div>
                        
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
            <br />
            <Row xs={1} lg={2}>
                {products.map(product => <Col><Product key={product.id} product={product} onChange={()=>handleChange(product.id)}/></Col>)}
             </Row>
        </div>
    )
}
