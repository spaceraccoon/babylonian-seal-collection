import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Breadcrumb, Button, Form, Icon, Input, Layout } from 'antd';

import { signIn } from '../../../api/sessionApi';

const { Content } = Layout;
const FormItem = Form.Item;

class Register extends Component {
  state = {
    redirectToReferrer: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (await signIn(values)) {
          this.setState(() => ({
            redirectToReferrer: true,
          }));
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </div>
      </Content>
    );
  }
}

const WrappedRegister = Form.create()(Register);

export default withRouter(WrappedRegister);
