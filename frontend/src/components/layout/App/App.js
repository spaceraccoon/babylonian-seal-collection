import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Navigation from '../Navigation/Navigation';
import SealList from '../../pages/SealList/SealList';
import SealDetail from '../../pages/SealDetail/SealDetail';
import SealCreate from '../../pages/SealCreate/SealCreate';
import SealEdit from '../../pages/SealEdit/SealEdit';
import SignIn from '../../pages/SignIn/SignIn';

import './App.css';

const { Footer } = Layout;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('accessToken') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={SealList} />
          <PrivateRoute exact path="/seal/create" component={SealCreate} />
          <PrivateRoute path="/seal/:id/edit" component={SealEdit} />
          <Route path="/seal/:id" component={SealDetail} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
        <Footer />
      </Layout>
    );
  }
}

export default App;
