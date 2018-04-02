import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Navigation from '../Navigation/Navigation';
import SealList from '../../pages/SealList/SealList';
import SealDetail from '../../pages/SealDetail/SealDetail';
import SealCreate from '../../pages/SealCreate/SealCreate';
import SealEdit from '../../pages/SealEdit/SealEdit';

import './App.css';

const { Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={SealList} />
          <Route exact path="/seal/create" component={SealCreate} />
          <Route path="/seal/:id/edit" component={SealEdit} />
          <Route path="/seal/:id" component={SealDetail} />
        </Switch>
        <Footer />
      </Layout>
    );
  }
}

export default App;
