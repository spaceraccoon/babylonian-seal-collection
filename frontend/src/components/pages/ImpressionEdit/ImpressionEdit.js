import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import ImpressionForm from '../../common/ImpressionForm/ImpressionForm';
import { fetchResource } from '../../../api/resourceApi';

class ImpressionEdit extends Component {
  state = {
    impression: null,
    redirect: false,
  };

  async componentDidMount() {
    const impression = await fetchResource(
      this.props.match.params.id,
      'impression'
    );
    if (!impression.can_edit) {
      message.error('You do not have permissions to edit this form.');
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
