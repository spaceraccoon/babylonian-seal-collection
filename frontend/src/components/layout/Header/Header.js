import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <Menu fixed="top">
        <Container>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Header;
