import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Table } from 'antd';

import { fetchResources, deleteResource } from '../../../api/resourceApi';
import './ImpressionList.css';

/**
 * Page that lists all impressions.
 */
class ImpressionList extends Component {
  state = {
    isLoading: true,
    impressions: [],
  };

  /**
   * Fetches and sets impression list.
   */
  async componentDidMount() {
    this.setState({
      isLoading: false,
      impressions: await fetchResources('impression'),
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
        render: (id, impression) => {
          return (
            <Fragment>
              <Link to={`/impression/${id}`}>
                <Button className="impression-table__button">View</Button>
              </Link>
              {/**
               * Displays action buttons for users with edit permissions.
               */}
              {impression.can_edit && (
                <Fragment>
                  <Link
                    to={{
                      pathname: `/impression/${id}/edit`,
                      state: { from: this.props.location },
                    }}
                  >
                    <Button className="impression-table__button" type="primary">
                      Edit
                    </Button>
                  </Link>
                  <Popconfirm
                    title="Are you sure？"
                    onConfirm={async () => {
                      if (await deleteResource(id, 'impression')) {
                        this.setState({
                          impressions: _.filter(
                            this.state.impressions,
                            impression => {
                              return impression.id !== id;
                            }
                          ),
                        });
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="impression-table__button" type="danger">
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
        <h1>Impressions</h1>
        <Table
          className="impression-table"
          columns={columns}
          dataSource={this.state.impressions}
          loading={this.state.isLoading}
          rowClassName="impression-table__row"
          rowKey="id"
        />
      </div>
    );
  }
}

export default ImpressionList;
