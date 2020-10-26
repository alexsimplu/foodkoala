import React, { useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth"; 
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

import { AuthContext } from '../context/AuthContext';

export default function CustomNav() {
    const { isAuthenticated, displayName } = useContext(AuthContext);

    async function handleLogout(e) {
        e.preventDefault();

        try {
            await firebase.auth().signOut();
        } catch(e) {
            console.warn(e);
        } 
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Food Koala</Navbar.Brand>
            <Nav className="mr-auto">
                <SrNavLink className="nav-link" to="/restaurants">Home</SrNavLink>
            </Nav>
            <Form inline>
                <ul className="navbar-nav">
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/login">Login</SrNavLink>
                            </li>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/register">Register</SrNavLink>
                            </li>
                        </>
                    ) : (
                        <>  
                        <li className="nav-item">
                                <SrNavLink className="nav-link" to="/edit">Edit Product</SrNavLink>
                            </li>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/add">Add Product</SrNavLink>
                            </li>
                            <li className="nav-link">
                                Welcome, {displayName}!    
                            </li>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/cart"> My Cart </SrNavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                            </li>
                            
                        </>
                    )}
                </ul>
            </Form>
        </Navbar>       
    )
}

function SrNavLink({ children, ...rest}) {
    const location = useLocation();

    return (
        <NavLink {...rest}>
            { children }
            { location.pathname === rest.to && <span className="sr-only">(current)</span> }
        </NavLink>
    );
}
