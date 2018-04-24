import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';

import Navigation from '../Navigation/Navigation';
import SealList from '../../pages/SealList/SealList';
import SealDetail from '../../pages/SealDetail/SealDetail';
import SealCreate from '../../pages/SealCreate/SealCreate';
import SealEdit from '../../pages/SealEdit/SealEdit';
import ImpressionList from '../../pages/ImpressionList/ImpressionList';
import ImpressionDetail from '../../pages/ImpressionDetail/ImpressionDetail';
import ImpressionCreate from '../../pages/ImpressionCreate/ImpressionCreate';
import ImpressionEdit from '../../pages/ImpressionEdit/ImpressionEdit';
import SignIn from '../../pages/SignIn/SignIn';

import './App.css';

const { Content, Footer } = Layout;

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
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Seal</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route exact path="/" component={SealList} />
            <PrivateRoute exact path="/seal/create" component={SealCreate} />
            <PrivateRoute path="/seal/:id/edit" component={SealEdit} />
            <Route path="/seal/:id" component={SealDetail} />
            <Route exact path="/impression" component={ImpressionList} />
            <PrivateRoute
              exact
              path="/impression/create"
              component={ImpressionCreate}
            />
            <PrivateRoute
              path="/impression/:id/edit"
              component={ImpressionEdit}
            />
            <Route path="/impression/:id" component={ImpressionDetail} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default App;
