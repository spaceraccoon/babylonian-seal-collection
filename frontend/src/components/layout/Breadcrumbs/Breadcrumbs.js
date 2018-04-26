import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import isInt from 'validator/lib/isInt';

/**
 * Object mapping snippets to names.
 */
const nameMap = {
  seal: 'Seal',
  impression: 'Impression',
  create: 'Create',
  edit: 'Edit',
  signin: 'Sign In',
};

/**
 * Component that breaks up location prop into breadcrumbs and relevant links.
 */
class Breadcrumbs extends Component {
  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link
            to={{
              pathname: url,
              state: {
                from: location,
              },
            }}
          >
            {/**
             * Checks if current snippet is an integer; if so, it is not
             * possible to match it against nameMap (due to variable key) and
             * instead returns the integer.
             */}
            {isInt(pathSnippets[index])
              ? pathSnippets[index]
              : nameMap[pathSnippets[index]]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
    );
  }
}

export default Breadcrumbs;
