import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Breadcrumb, Col, Form, Layout, Row, Tabs } from 'antd';

import SignInForm from './SignInForm/SignInForm';
import './SignIn.css';

const { Content } = Layout;
const { TabPane } = Tabs;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer || localStorage.getItem('accessToken')) {
      return <Redirect to={from} />;
    }

    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Sign In</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col
            className="signin-card-container"
            xs={24}
            lg={{ span: 8, offset: 8 }}
          >
            <Tabs type="card">
              <TabPane tab="Sign Up" key="1">
                <SignInForm setState={this.setState.bind(this)} />
              </TabPane>
              <TabPane tab="Register" key="2">
                <SignInForm register setState={this.setState.bind(this)} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    );
  }
}

const WrappedSignIn = Form.create()(SignIn);

export default withRouter(WrappedSignIn);
