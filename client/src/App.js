import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './comps/Login/Login';
import Profile from './comps/Profile';
import Dashboard from './comps/Profile/Dashboard';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';

axios.defaults.withCredentials = true;

function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute path="/profile/dashboard" component={Dashboard} />
        {/* <Route exact path="/profile" component={Profile}/>
        <Route path="/profile/dashboard" component={Dashboard}/> */}
      </Switch>
    </Router>
  );
}

export default App;
