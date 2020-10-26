import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase/app';

import CustomNav from './Navbar';
import ErrorContextProvider from './Error/ErrorContext';
import Error from './Error/Error';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Restaurants from '../features/Restaurants/Restaurants';
import Products from '../features/Products/Products';
import EditProduct from './AddProduct/EditProduct';
import AddProduct from './AddProduct/AddProduct';


import {CartContextProvider} from '../context/CartContext'
import Cart from '../features/Cart/Cart'
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContextProvider } from '../context/AuthContext';


function App() {
    return (
        <div className='container'>
            <AuthContextProvider>
                <ErrorContextProvider>
                    <Error />                   
                    <Router>
                        <CartContextProvider>
                            <CustomNav />
                            <Switch>
                                <Route exact path='/login' component={Login}/>
                                <Route exact path='/register' component={Register}/>
                                <Route exact path="/restaurants" component={Restaurants}/>
                                <Route exact path="/restaurants/:restaurant_id/products" component={Products}/>
                                <Route exact path="/cart" component={Cart}/>
                                <Route exact path='/edit' component={EditProduct}/> 
                            	<Route exact path='/add' component={AddProduct}/> 
                                <Route exact path='/' component={Restaurants}/>
                                <Route component={() => <h1>404</h1>} />
                            </Switch>
                        </CartContextProvider>
                    </Router>
                </ErrorContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
