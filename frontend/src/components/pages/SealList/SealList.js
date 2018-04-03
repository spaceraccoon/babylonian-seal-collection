import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider, Layout, Popconfirm, Table } from 'antd';

import { fetchSeals, deleteSeal } from '../../../api/sealApi';

const { Content } = Layout;

class SealList extends Component {
  state = {
    seals: [],
  };

  async componentDidMount() {
    this.setState({
      seals: await fetchSeals(),
    });
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Creator',
        dataIndex: 'creator_username',
      },
      {
        title: 'Updated At',
        dataIndex: 'updated_at',
        render: timestamp => <Moment date={timestamp} />,
      },
      {
        title: 'Action',
        dataIndex: 'id',
        render: (id, seal) => {
          return (
            <Fragment>
              <Link to={`/seal/${id}`}>View</Link>
              {seal.is_creator && (
                <Fragment>
                  <Divider type="vertical" />
                  <Link to={`/seal/${id}/edit`}>Edit</Link>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure？"
                    onConfirm={async () => {
                      if (await deleteSeal(id)) {
                        this.setState({
                          seals: _.filter(this.state.seals, seal => {
                            return seal.id !== id;
                          }),
                        });
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </Fragment>
              )}
            </Fragment>
          );
        },
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
