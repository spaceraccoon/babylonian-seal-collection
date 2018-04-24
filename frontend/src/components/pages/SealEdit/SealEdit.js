import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import SealForm from '../../common/SealForm/SealForm';
import { fetchResource } from '../../../api/resourceApi';

class SealEdit extends Component {
  state = {
    seal: null,
    redirect: false,
  };

  async componentDidMount() {
    const seal = await fetchResource(this.props.match.params.id, 'seal');
    if (!seal.can_edit) {
      message.error('You do not have permissions to edit this form.');
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
        <SealForm {...this.props} seal={this.state.seal} edit />
      </div>
    );
  }
}

export default SealEdit;
