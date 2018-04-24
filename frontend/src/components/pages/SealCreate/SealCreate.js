import React, { Component } from 'react';
import SealForm from '../../common/SealForm/SealForm';

class SealCreate extends Component {
  render() {
    return (
      <div className="content-body">
        <SealForm {...this.props} />
      </div>
    );
  }
}

export default SealCreate;
