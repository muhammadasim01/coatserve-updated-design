import React from 'react';

import NavBarSide from './NavBarSide';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <NavBarSide /> 
        <Switch>
          <Route path='/' />
          <Route path='/' />
          <Route path='/' />
        </Switch>
      </Router>
    </>
  );
}

export default App;