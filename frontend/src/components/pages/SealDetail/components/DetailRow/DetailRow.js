import React, { Component } from 'react';
import { Col, Row } from 'antd';

class DetailRow extends Component {
  render() {
    return (
      <Row className="seal-detail">
        <Col xs={24} lg={4} className="seal-detail__label">
          <label>
            <strong>{this.props.label}</strong>
          </label>
        </Col>
        <Col xs={24} lg={12}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default DetailRow;
