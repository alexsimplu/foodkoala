import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Restaurants from './features/Restaurants/Restaurants';
import NavBar from './components/NavBar/NavBar';
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container fluid>
            <Router>
                <NavBar/>
                <Switch>
                    <Route to="/restaurants" component={Restaurants}/>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
