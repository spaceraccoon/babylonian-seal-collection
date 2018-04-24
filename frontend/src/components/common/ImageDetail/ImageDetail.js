import React, { Component } from 'react';
import { Modal } from 'antd';

import DetailRow from '../DetailRow/DetailRow';
import { fetchSignedUrl } from '../../../api/uploadApi';

class ImageDetail extends Component {
  state = {
    imageUrl: '',
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  async componentDidMount() {
    let { signedUrl } = await fetchSignedUrl('get_object', this.props.value);
    this.setState({
      imageUrl: signedUrl,
    });
  }

  render() {
    return (
      <DetailRow nested={this.props.nested} label={this.props.label}>
        <img
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={this.showModal}
          src={this.state.imageUrl}
          alt={this.props.label}
        />
        <Modal
          width={960}
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img
            style={{ width: '100%' }}
            src={this.state.imageUrl}
            alt={this.props.label}
          />
        </Modal>
      </DetailRow>
    );
  }
}

export default ImageDetail;
