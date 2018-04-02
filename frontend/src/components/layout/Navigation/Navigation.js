import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class Navigation extends Component {
  render() {
    return (
      <Header>
        <Menu
          defaultSelectedKeys={['1']}
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
        </Menu>
      </Header>
    );
  }
}

export default Navigation;
