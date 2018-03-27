import React, { Component } from 'react';
import { Container, Header, Loader, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import axios from 'axios';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

class SealList extends Component {
  state = {
    seals: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/api/seal');
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: props => <Moment date={props.value} />,
      },
    ];

    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">Seals</Header>
        <ReactTable
          data={this.state.seals}
          columns={columns}
          minRows={0}
          loading={this.state.seals.length === 0}
          loadingText={<Loader active />}
          noDataText=""
          PreviousComponent={Button}
          NextComponent={Button}
        />
      </Container>
    );
  }
}

export default SealList;
