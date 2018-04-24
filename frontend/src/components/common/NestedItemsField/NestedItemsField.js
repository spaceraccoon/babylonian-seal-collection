import React, { Component, Fragment } from 'react';
import { Button, Form, Icon, Select } from 'antd';
import _ from 'lodash';
import pluralize from 'pluralize';

import {
  formItemLayout,
  formItemLayoutWithoutLabel,
} from '../../../data/formLayouts';
import NestedItem from './components/NestedItem/NestedItem';

const { Option } = Select;
const FormItem = Form.Item;

class NestedItemsField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.initialItems,
      imageList: [],
    };
  }

  removeItem = index => {
    this.setState({
      items: this.state.items.filter((item, i) => index !== i),
    });
  };

  addItem = (value, option) => {
    if (option) {
      // check if item has already been added
      if (
        !_.find(this.state.items, function(item) {
          return item.id === option.props.item.id;
        }) ||
        this.props.field === 'historical_relationships'
      ) {
        this.setState({
          items: [...this.state.items, option.props.item],
        });
      }
    } else {
      this.setState({
        items: [...this.state.items, {}],
      });
    }
  };

  render() {
    const items = this.state.items.map((item, index) => {
      return (
        <NestedItem
          field={this.props.field}
          form={this.props.form}
          headerText={
            _.get(this.state.items[index], this.props.nestedItemLabel) ||
            this.state.items[index][this.props.nestedItemLabel] ||
            `New ${this.props.singularLabel}`
          }
          item={item}
          itemFields={this.props.itemFields}
          index={index}
          key={index}
          nestedOptions={this.props.nestedOptions}
          removeItem={this.removeItem}
        />
      );
    });

    return (
      <Fragment>
        {this.props.field !== 'images' && (
          <FormItem
            style={{ marginBottom: 4 }}
            {...formItemLayout}
            label={this.props.label}
          >
            <Select
              showSearch
              onSelect={this.addItem}
              placeholder={`Search for an existing ${pluralize
                .singular(this.props.searchLabel || this.props.label)
                .toLowerCase()}`}
              filterOption={(input, option) =>
                _.some(option.props.item, value => {
                  return (
                    _.isString(value) &&
                    value.toLowerCase().includes(input.toLowerCase())
                  );
                })
              }
            >
              {this.props.options.map((item, index) => {
                return (
                  <Option key={index} value={index} item={item}>
                    <Fragment>
                      {_.get(item, this.props.nestedItemLabel)}
                    </Fragment>
                  </Option>
                );
              })}
            </Select>
          </FormItem>
        )}
        {items}
        <FormItem {...formItemLayoutWithoutLabel}>
          <Button
            type="dashed"
            onClick={this.addItem}
            style={{ width: '100%' }}
          >
            <Icon type="plus" /> Create new{' '}
            {pluralize.singular(this.props.label).toLowerCase()}
          </Button>
        </FormItem>
      </Fragment>
    );
  }
}

export default NestedItemsField;
