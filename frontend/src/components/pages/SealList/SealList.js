import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Table } from 'antd';

import { fetchResources, deleteResource } from '../../../api/resourceApi';

import './SealList.css';

class SealList extends Component {
  state = {
    isLoading: true,
    seals: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: false,
      seals: await fetchResources('seal'),
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
              <Link to={`/seal/${id}`}>
                <Button className="seal-table__button">View</Button>
              </Link>
              {seal.can_edit && (
                <Fragment>
                  <Link to={`/seal/${id}/edit`}>
                    <Button className="seal-table__button" type="primary">
                      Edit
                    </Button>
                  </Link>
                  <Popconfirm
                    title="Are you sure？"
                    onConfirm={async () => {
                      if (await deleteResource(id, 'seal')) {
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
                    <Button className="seal-table__button" type="danger">
                      Delete
                    </Button>
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
          className="seal-table"
          columns={columns}
          dataSource={this.state.seals}
          loading={this.state.isLoading}
          rowClassName="seal-table__row"
          rowKey="id"
        />
      </div>
    );
  }
}

export default SealList;
