import React, { Component } from 'react';
import { Col, Row } from 'antd';

/**
 * Container row for detail data.
 */
class DetailRow extends Component {
  render() {
    return (
      <Row className="seal-detail">
        <Col xs={24} md={4} className="seal-detail__label">
          <label>
            <strong>{this.props.label}</strong>
          </label>
        </Col>
        <Col xs={24} md={this.props.nested ? 20 : 12}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default DetailRow;
