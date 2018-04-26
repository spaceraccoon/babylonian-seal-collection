import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

import { fetchResource } from '../../../api/resourceApi';
import ImpressionForm from '../../common/ImpressionForm/ImpressionForm';

/**
 * Page that displays an impression editing form.
 */
class ImpressionEdit extends Component {
  state = {
    impression: null,
    redirect: false,
  };

  /**
   * Fetches and sets existing impression data.
   * Checks if user has edit permissions, redirecting if not.
   */
  async componentDidMount() {
    const impression = await fetchResource(
      this.props.match.params.id,
      'impression'
    );
    if (!impression.can_edit) {
      message.error('You do not have permissions to edit this impression.');
      this.setState({
        redirect: true,
      });
    } else {
      this.setState({
        impression,
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="content-body">
        <h1>Edit Impression</h1>
        {/**
         * Passes down impression data, edit flag, and router state
         * so form knows where to redirect after successful update
         * or cancel.
         */}
        <ImpressionForm
          {...this.props}
          impression={this.state.impression}
          edit
        />
      </div>
    );
  }
}

export default ImpressionEdit;
