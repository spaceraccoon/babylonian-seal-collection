import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Layout, Menu, Popover } from 'antd';

import './Navigation.css';
import { signOut } from '../../../api/sessionApi';
import enquireScreen from '../../../utils/enquireScreen';

const { Header } = Layout;

class Navigation extends Component {
  state = {
    menuMode: 'horizontal',
    menuVisible: false,
  };

  componentDidMount() {
    this.props.history.listen(this.handleHideMenu);
    enquireScreen(b => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    });
  };

  render() {
    const menu = (
      <Menu
        selectable={false}
        theme={this.state.menuMode === 'horizontal' ? 'dark' : 'light'}
        mode={this.state.menuMode}
        style={{ lineHeight: '64px' }}
        id="nav"
        key="nav"
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link
            to={{
              pathname: '/seal/create',
              state: { from: this.props.location },
            }}
          >
            Create Seal
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/impression">Impressions</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link
            to={{
              pathname: '/impression/create',
              state: { from: this.props.location },
            }}
          >
            Create Impression
          </Link>
        </Menu.Item>
        {localStorage.accessToken ? (
          <Menu.Item key="5" style={{ float: 'right' }}>
            <a href="/" onClick={signOut}>
              Sign Out
            </a>
          </Menu.Item>
        ) : (
          <Menu.Item key="5" style={{ float: 'right' }}>
            <Link to="/signin">Sign In</Link>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <Header>
        {this.state.menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomLeft"
            content={menu}
            trigger="click"
            arrowPointAtCenter
            visible={this.state.menuVisible}
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-icon"
              onClick={this.handleShowMenu}
              type="bars"
            />
          </Popover>
        ) : null}
        {this.state.menuMode === 'horizontal' && menu}
      </Header>
    );
  }
}

export default withRouter(Navigation);
