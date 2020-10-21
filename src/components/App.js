import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase/app';

import Navbar from './Navbar';
import ErrorContextProvider from './Error/ErrorContext';
import Error from './Error/Error';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';

import 'bootstrap/dist/css/bootstrap.css';
import { AuthContextProvider } from '../features/auth/AuthContext';


function App() {
    return (
        <div className='container'>
            <AuthContextProvider>
                <ErrorContextProvider>
                    <Error />
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route
                                exact
                                path='/login'
                                component={Login}
                            />
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route
                                exact
                                path='/'
                                component={() => <h1>Homepage</h1>}
                            />
                            <Route component={() => <h1>404</h1>} />
                        </Switch>
                    </Router>
                </ErrorContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
