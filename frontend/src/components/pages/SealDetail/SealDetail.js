import React, { Component } from 'react';
import axios from 'axios';

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
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        Content
      </div>
    );
  }
}

export default SealList;
