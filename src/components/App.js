import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase/app';

import Navbar from './Navbar';
import ErrorContextProvider from './Error/ErrorContext';
import Error from './Error/Error';
import Login from '../features/auth/Login';

import 'bootstrap/dist/css/bootstrap.css';
import { AuthContextProvider } from '../features/auth/AuthContext';

const firebaseConfig = {
    apiKey: 'AIzaSyAFBV1vWOBT3WyWrfaTtvm4Y8DqYVxLcVk',
    authDomain: 'foof-koala.firebaseapp.com',
    databaseURL: 'https://foof-koala.firebaseio.com',
    projectId: 'foof-koala',
    storageBucket: 'foof-koala.appspot.com',
    messagingSenderId: '758863475140',
    appId: '1:758863475140:web:d6cefd8bd5b82f7acff491',
    measurementId: 'G-TTHCDDCHYM',
};

firebase.initializeApp(firebaseConfig);

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
