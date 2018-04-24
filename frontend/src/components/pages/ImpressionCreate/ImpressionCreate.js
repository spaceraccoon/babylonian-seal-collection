import React, { Component } from 'react';
import ImpressionForm from '../../common/ImpressionForm/ImpressionForm';

class ImpressionCreate extends Component {
  render() {
    return (
      <div className="content-body">
        <ImpressionForm {...this.props} />
      </div>
    );
  }
}

export default ImpressionCreate;
