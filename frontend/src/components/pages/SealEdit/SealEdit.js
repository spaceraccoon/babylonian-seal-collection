import React, { Component } from 'react';
import { Breadcrumb, Layout } from 'antd';

import SealForm from '../../common/SealForm/SealForm';
import { fetchSeal } from '../../../api/sealApi';

const { Content } = Layout;

class SealEdit extends Component {
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
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <SealForm seal={this.state.seal} />
        </div>
      </Content>
    );
  }
}

export default SealEdit;
