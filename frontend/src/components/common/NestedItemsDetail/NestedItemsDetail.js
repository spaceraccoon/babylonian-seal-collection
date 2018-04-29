import React, { Component } from 'react';
import { Collapse } from 'antd';
import _ from 'lodash';
import pluralize from 'pluralize';

import DetailRow from '../DetailRow/DetailRow';
import CharDetail from '../CharDetail/CharDetail';
import TagsDetail from '../TagsDetail/TagsDetail';
import ImageDetail from '../ImageDetail/ImageDetail';

const { Panel } = Collapse;

/**
 * Displays multiple nested field data.
 */
class NestedItemsDetail extends Component {
  render() {
    return (
      <DetailRow label={this.props.label}>
        {this.props.values
          ? this.props.values.map(value => (
              <Collapse defaultActiveKey={null} key={value.id}>
                <Panel
                  header={
                    _.get(value, this.props.nestedItemLabel) ||
                    `Untitled ${pluralize.singular(this.props.label)}`
                  }
                >
                  {this.props.itemDetails.map(itemDetail => {
                    switch (itemDetail.type) {
                      case 'tagsField':
                        return (
                          <TagsDetail
                            nested={true}
                            key={itemDetail.field}
                            label={itemDetail.label}
                            values={_.get(value, itemDetail.field)}
                          />
                        );
                      case 'image':
                        return (
                          <ImageDetail
                            nested={true}
                            key={itemDetail.field}
                            label={itemDetail.label}
                            value={_.get(value, itemDetail.field)}
                          />
                        );
                      default:
                        return (
                          <CharDetail
                            nested={true}
                            key={itemDetail.field}
                            label={itemDetail.label}
                            value={_.get(value, itemDetail.field)}
                          />
                        );
                    }
                  })}
                </Panel>
              </Collapse>
            ))
          : null}
      </DetailRow>
    );
  }
}

export default NestedItemsDetail;
