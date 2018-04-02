import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import SealForm from '../../common/SealForm/SealForm';

const { Content } = Layout;

class SealEdit extends Component {
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
