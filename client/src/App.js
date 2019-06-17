import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/ui/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/layouts/Login';
import Register from './components/layouts/Register';
import SkillsDisplay from './components/layouts/SkillsDisplay';
import ForumsDisplay from './components/layouts/ForumsDisplay';

const App = () => (
  <Router>
    <div className="wrapper">
      <Navbar />
      <div className="content-container">
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Skills" component={SkillsDisplay} />
          <Route exact path="/Forums" component={ForumsDisplay} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
