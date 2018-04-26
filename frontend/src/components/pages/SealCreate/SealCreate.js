import React, { Component } from 'react';
import SealForm from '../../common/SealForm/SealForm';

/**
 * Page that displays a seal creation form.
 */
class SealCreate extends Component {
  render() {
    return (
      <div className="content-body">
        <h1>Create Seal</h1>
        <SealForm {...this.props} />
      </div>
    );
  }
}

export default SealCreate;
