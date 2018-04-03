import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

class SealList extends Component {
  state = {
    seal: {},
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/api/seal/${this.props.match.params.id}`
      );
      this.setState({
        seal: response.data,
      });
    } catch (e) {
      console.error(e);
    }
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
