import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider, Layout, message, Popconfirm, Table } from 'antd';

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
      console.log(this.state.seals);
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
        render: id => (
          <Fragment>
            <Link to={`/seal/${id}`}>View</Link>
            <Divider type="vertical" />
            <Link to={`/seal/${id}/edit`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure？"
              onConfirm={async () => {
                try {
                  await axios.delete(`/api/seal/${id}`);
                  this.setState({
                    seals: _.filter(this.state.seals, seal => {
                      return seal.id !== id;
                    }),
                  });
                  message.success('Deleted seal.');
                } catch (e) {
                  console.error(e);
                  message.error('Failed to delete seal.');
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
          </Fragment>
        ),
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
