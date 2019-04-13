import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './pages/Home';
import Learn from './pages/Learn';
import Train from './pages/Train';

const App = () => {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to='/train-model'>Train Model</Link>
            <Link to='/learn'>Learn</Link>
          </header>
          <div>
            <Route path='/' exact component={Home}/>
            <Route path="/train-model" exact component={Train} />
            <Route path="/learn" exact component={Learn} />
          </div>
        </div>
      </Router>
    );
};

export default App;
