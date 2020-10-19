import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";

import { useForm } from '../../hooks';
import { AuthContext } from './AuthContext';
import { Redirect, useLocation } from 'react-router-dom';
import { ErrorContext } from '../../components/Error/ErrorContext';

export default function Login() {
    const { values, bindInput } = useForm(null);
    const { isAuthenticated } = useContext(AuthContext);
    const { pathname } = useLocation();
    const { setMessage } = useContext(ErrorContext)
    const isLogin = (pathname === '/login');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if(isLogin) {
                await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
            }
        } catch(e) {
            setMessage(e.message);
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...bindInput('email')} />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...bindInput('password')} />
                </p>                               <p>
                    <button type="submit">Login</button>
                </p>
            </form>
        </div>
    )
}
