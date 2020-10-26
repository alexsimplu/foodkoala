import './AuthStyle.css';
import React, { useState, useContext } from "react";
import { Redirect, Link } from 'react-router-dom';
import { auth, generateUserDocument } from '../../Firebase.js';

import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const { isAuthenticated, user } = useContext(AuthContext);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await generateUserDocument(user, { displayName }, { address });
        }
        catch (error) {
            setError('Error Signing up with email and password');
        }

        return <Redirect to='/' />
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        } else if (name === "address") {
            setAddress(value);
        }
    };

    return (
        <div className="mt-8">
            <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                {error !== null && (
                    <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                        {error}
                    </div>
                )}
                <form className="">

                    <label htmlFor="userEmail" className="block">
                        Email:
          </label>
                    <input
                        type="email"
                        className="my-1 p-1 w-full"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: user@gmail.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block">
                        Password:
          </label>
                    <input
                        type="password"
                        className="mt-1 mb-3 p-1 w-full"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="displayName" className="block">
                        Display Name:
          </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="displayName"
                        value={displayName}
                        placeholder="E.g: user"
                        id="displayName"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="adress" className="block">
                        Address:
          </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="address"
                        value={address}
                        placeholder="E.g: Str. Noua Nr. 10"
                        id="address"
                        onChange={event => onChangeHandler(event)}
                    />
                    <button
                        className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                        onClick={event => {
                            createUserWithEmailAndPasswordHandler(event, email, password);
                        }}
                    >
                        Sign up
          </button>
                </form>
                <p className="text-center my-3">or</p>

                <p className="text-center my-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-600">
                        Sign in here
          </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
