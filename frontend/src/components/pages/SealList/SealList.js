import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Divider, Popconfirm, Table } from 'antd';

import { fetchSeals, deleteSeal } from '../../../api/sealApi';

class SealList extends Component {
  state = {
    isLoading: true,
    seals: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: false,
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
              {seal.can_edit && (
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
      <div className="content-body">
        <Table
          columns={columns}
          dataSource={this.state.seals}
          loading={this.state.isLoading}
          rowKey="id"
        />
      </div>
    );
  }
}

export default SealList;
