import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Layout, Menu, Popover } from 'antd';

import { signOut } from '../../../api/sessionApi';
import enquireScreen from '../../../utils/enquireScreen';
import './Navigation.css';

const { Header } = Layout;

/**
 * Navigation menu component that displays navigation links.
 */
class Navigation extends Component {
  state = {
    menuMode: 'horizontal',
    menuVisible: false,
  };

  /**
   * Ensures popover menu (if in use) is hidden on load and sets menuMode
   * based on screen size.
   */
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
    const { location } = this.props;

    const menu = (
      <Menu
        selectable={false}
        theme={this.state.menuMode === 'horizontal' ? 'dark' : 'light'}
        mode={this.state.menuMode}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link
            to={{
              pathname: '/seal/create',
              state: { from: location },
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
              state: { from: location },
            }}
          >
            Create Impression
          </Link>
        </Menu.Item>
        {/**Checks if user is signed in and displays appropriate button. */}
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
        ) : (
          menu
        )}
      </Header>
    );
  }
}

export default withRouter(Navigation);
