import React, { Component } from 'react';
import { Tag } from 'antd';

import DetailRow from '../DetailRow/DetailRow';
import stringToColor from '../../../../../utils/stringToColor';

class TagsDetail extends Component {
  render() {
    return (
      <DetailRow label={this.props.label}>
        {this.props.values &&
          this.props.values.map(value => (
            <Tag color={stringToColor(value.name)} key={value.id}>
              {value.name}
            </Tag>
          ))}
      </DetailRow>
    );
  }
}

export default TagsDetail;
