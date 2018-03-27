import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import SealList from '../../pages/SealList/SealList';
import SealDetail from '../../pages/SealDetail/SealDetail';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={SealList} />
          <Route path="/seal/:id" component={SealDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
