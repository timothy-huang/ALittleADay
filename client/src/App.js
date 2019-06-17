import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/ui/Navbar';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import SkillsDisplay from './components/pages/SkillsDisplay';
import ForumsDisplay from './components/pages/ForumsDisplay';

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
