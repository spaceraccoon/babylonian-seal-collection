import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

import { fetchResource } from '../../../api/resourceApi';
import SealForm from '../../common/SealForm/SealForm';

/**
 * Page that displays a seal editing form.
 */
class SealEdit extends Component {
  state = {
    seal: null,
    redirect: false,
  };

  /**
   * Fetches and sets existing seal data.
   * Checks if user has edit permissions, redirecting if not.
   */
  async componentDidMount() {
    const seal = await fetchResource(this.props.match.params.id, 'seal');
    if (!seal.can_edit) {
      message.error('You do not have permissions to edit this seal.');
      this.setState({
        redirect: true,
      });
    } else {
      this.setState({
        seal,
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="content-body">
        <h1>Edit Seal</h1>
        {/**
         * Passes down seal data, edit flag, and router state
         * so form knows where to redirect after successful update
         * or cancel.
         */}
        <SealForm {...this.props} seal={this.state.seal} edit />
      </div>
    );
  }
}

export default SealEdit;
