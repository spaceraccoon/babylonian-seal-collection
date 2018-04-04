import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { signOut } from '../../../api/sessionApi';

const { Header } = Layout;

class Navigation extends Component {
  render() {
    return (
      <Header>
        <Menu
          selectable={false}
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/seal/create">Create Seal</Link>
          </Menu.Item>
          {localStorage.accessToken ? (
            <Menu.Item key="3" style={{ float: 'right' }}>
              <a href="/" onClick={signOut}>
                Sign Out
              </a>
            </Menu.Item>
          ) : (
            <Menu.Item key="3" style={{ float: 'right' }}>
              <Link to="/signin">Sign In</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    );
  }
}

export default Navigation;
