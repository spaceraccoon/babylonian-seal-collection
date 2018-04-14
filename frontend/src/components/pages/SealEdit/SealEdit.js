import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import SealForm from '../../common/SealForm/SealForm';
import { fetchSeal } from '../../../api/sealApi';

class SealEdit extends Component {
  state = {
    seal: null,
    redirect: false,
  };

  async componentDidMount() {
    const seal = await fetchSeal(this.props.match.params.id);
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
        <SealForm seal={this.state.seal} edit />
      </div>
    );
  }
}

export default SealEdit;
