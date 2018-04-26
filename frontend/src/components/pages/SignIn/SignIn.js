import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Form, Row, Tabs } from 'antd';

import SignInForm from './components/SignInForm/SignInForm';
import './SignIn.css';

const { TabPane } = Tabs;

/**
 * Sign up page for users to sign in or sign up.
 */
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };

  /**
   * Displays sign in and sign up tabs, redirecting to referrer
   * on successful sign in or sign up.
   */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer || localStorage.getItem('accessToken')) {
      return <Redirect to={from} />;
    }

    return (
      <Row>
        <Col
          className="signin-card-container"
          xs={24}
          lg={{ span: 8, offset: 8 }}
        >
          <Tabs type="card">
            <TabPane tab="Sign In" key="1">
              <SignInForm setState={this.setState.bind(this)} />
            </TabPane>
            <TabPane tab="Register" key="2">
              <SignInForm register setState={this.setState.bind(this)} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

const WrappedSignIn = Form.create()(SignIn);

export default WrappedSignIn;
