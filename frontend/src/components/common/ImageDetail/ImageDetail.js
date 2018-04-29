import React, { Component } from 'react';
import { Modal } from 'antd';

import { fetchSignedUrl } from '../../../api/uploadApi';
import DetailRow from '../DetailRow/DetailRow';

/**
 * Displays image with a modal.
 */
class ImageDetail extends Component {
  state = {
    imageUrl: '',
    visible: false,
  };

  /**
   * Since S3 data is not accessible by direct public URLs, component needs
   * to fetch a signed URL that can get the image data from S3.
   */
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
          onClick={() =>
            this.setState({
              visible: true,
            })
          }
          src={this.state.imageUrl}
          alt={this.props.label}
        />
        <Modal
          width={960}
          footer={null}
          visible={this.state.visible}
          onCancel={() =>
            this.setState({
              visible: false,
            })
          }
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
