import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Table } from 'antd';

const { Content } = Layout;

class SealList extends Component {
  state = {
    seals: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/api/seal/');
      this.setState({
        seals: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Updated At',
        dataIndex: 'updated_at',
        render: timestamp => <Moment date={timestamp} />,
      },
      {
        title: 'Action',
        dataIndex: 'id',
        render: id => <Link to={`/seal/${id}/edit`}>Edit</Link>,
      },
    ];

    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Table columns={columns} dataSource={this.state.seals} rowKey="id" />
        </div>
      </Content>
    );
  }
}

export default SealList;
