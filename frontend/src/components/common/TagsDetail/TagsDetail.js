import React, { Component } from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import DetailRow from '../DetailRow/DetailRow';
import stringToColor from '../../../utils/stringToColor';

class TagsDetail extends Component {
  render() {
    return (
      <DetailRow nested={this.props.nested} label={this.props.label}>
        {this.props.values &&
          this.props.values.map(
            value =>
              value.name &&
              (this.props.link ? (
                <Link to={`/${this.props.link}/${value.id}`} key={value.id}>
                  <Tag color={stringToColor(value.name)}>{value.name}</Tag>
                </Link>
              ) : (
                <Tag color={stringToColor(value.name)} key={value.id}>
                  {value.name}
                </Tag>
              ))
          )}
      </DetailRow>
    );
  }
}

export default TagsDetail;
