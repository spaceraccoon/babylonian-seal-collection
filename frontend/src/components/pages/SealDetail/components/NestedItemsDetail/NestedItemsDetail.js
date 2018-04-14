import React, { Component } from 'react';
import { Collapse } from 'antd';

import DetailRow from '../DetailRow/DetailRow';
import CharDetail from '../CharDetail/CharDetail';
import TagsDetail from '../TagsDetail/TagsDetail';

const { Panel } = Collapse;

class NestedItemsDetail extends Component {
  render() {
    return (
      <DetailRow label={this.props.label}>
        {this.props.values
          ? this.props.values.map(value => (
              <Collapse defaultActiveKey={null} key={value.id}>
                <Panel header={value[this.props.nestedItemLabel]}>
                  {this.props.itemDetails.map(itemDetail => {
                    switch (itemDetail.type) {
                      case 'tagsField':
                        return (
                          <TagsDetail
                            key={itemDetail.field}
                            label={itemDetail.label}
                            values={value[itemDetail.field]}
                          />
                        );
                      default:
                        return (
                          <CharDetail
                            key={itemDetail.field}
                            label={itemDetail.label}
                            value={value[itemDetail.field]}
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
