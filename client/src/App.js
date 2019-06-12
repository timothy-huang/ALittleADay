import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './App.css';

const App = () => (
  <Router>
    <Fragment className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
