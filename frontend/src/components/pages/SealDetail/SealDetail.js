import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  List,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Container text style={{ marginTop: '7em' }}>
        <Loader active={!this.state.seal} inline="centered" />
        <Header as="h1">{this.state.seal.name}</Header>
        {this.state.seal.id}
      </Container>
    );
  }
}

export default SealList;
