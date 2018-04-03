import React, { Component } from 'react';
import { Breadcrumb, Layout } from 'antd';

import { fetchSeal } from '../../../api/sealApi';

const { Content } = Layout;

class SealList extends Component {
  state = {
    seal: {},
  };

  async componentDidMount() {
    this.setState({
      seal: await fetchSeal(this.props.match.params.id),
    });
  }

  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Seal</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <h1>{this.state.seal.name}</h1>
          <h2>Identification</h2>
        </div>
      </Content>
    );
  }
}

export default SealList;
