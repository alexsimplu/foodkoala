import React, { useContext, useState } from 'react';
import "firebase/auth";
import {auth} from '../../Firebase'

import { useForm } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, useLocation, Link } from 'react-router-dom';

export default function Login() {
    const { values, bindInput } = useForm(null);
    const { isAuthenticated, user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const [error, setError] = useState(null);
    const isLogin = (pathname === '/login');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (isLogin) {
                auth.signInWithEmailAndPassword(values.email, values.password).catch(error => {
                    setError("Error signing in with password and email!");
                      console.error("Error signing in with password and email", error);
                    });
            }
        } catch (e) {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="mt-8">
        <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
          <form className="">
            <label htmlFor="userEmail" className="block">
              Email:
            </label>
            <input
              type="email"
              className="my-1 p-1 w-full"
              name="userEmail"
              placeholder="E.g: user@gmail.com"
              id="userEmail"
              {...bindInput('email')}
            />
            <label htmlFor="userPassword" className="block">
              Password:
            </label>
            <input
              type="password"
              className="mt-1 mb-3 p-1 w-full"
              name="userPassword"
              placeholder="Your Password"
              id="userPassword"
              {...bindInput('password')}
            />
            <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {handleSubmit(event)}}>
              Sign in
            </button>
          </form>
          <p className="text-center my-3">
            Don't have an account?
            <Link className="text-blue-500 hover:text-blue-600" to="/register">Register</Link>            
          </p>
        </div>
      </div>
    )
}
