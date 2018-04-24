import React, { Component } from 'react';
import Moment from 'react-moment';

import DetailRow from '../DetailRow/DetailRow';

class CharField extends Component {
  render() {
    return (
      <DetailRow nested={this.props.nested} label={this.props.label}>
        {this.props.time ? (
          <Moment date={this.props.value} />
        ) : (
          this.props.value
        )}
      </DetailRow>
    );
  }
}

export default CharField;
