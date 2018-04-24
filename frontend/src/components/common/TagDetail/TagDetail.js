import React, { Component } from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import DetailRow from '../DetailRow/DetailRow';
import stringToColor from '../../../utils/stringToColor';

class TagsDetail extends Component {
  render() {
    return (
      <DetailRow nested={this.props.nested} label={this.props.label}>
        {this.props.value &&
          this.props.value.name &&
          (this.props.link ? (
            <Link to={`/${this.props.link}/${this.props.value.id}`}>
              <Tag
                color={stringToColor(this.props.value.name)}
                key={this.props.value.id}
              >
                {this.props.value.name}
              </Tag>
            </Link>
          ) : (
            <Tag
              color={stringToColor(this.props.value.name)}
              key={this.props.value.id}
            >
              {this.props.value.name}
            </Tag>
          ))}
      </DetailRow>
    );
  }
}

export default TagsDetail;
