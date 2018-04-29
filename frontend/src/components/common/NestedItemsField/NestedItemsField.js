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

/**
 * Form field component that displays multiple nested fields and allows the
 * user to add or remove nested items.
 */
class NestedItemsField extends Component {
  /**
   * Initialize items state from initialItems prop.
   * @param {!Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      items: props.initialItems,
      imageList: [],
    };
  }

  /**
   * Remove selected item from state.
   */
  removeItem = index => {
    this.setState({
      items: this.state.items.filter((item, i) => index !== i),
    });
  };

  /**
   * Adds an item to state. Adds option data if selecting an existing option or
   * adds blank data if creating a new item.
   */
  addItem = (value, option) => {
    if (option) {
      /**
       * Check if option has already been added. historical_relationships
       * is excused because you are adding historical person data, which
       * can be duplicated across different historical_relationships.
       */
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
    /**
     * Maps selected items state to NestedItem components, passing the item data
     * and form fields. Checks whether the specified field to extract header
     * text is avilable, otherwise passes down default text.
     */
    const items = this.state.items.map((item, index) => {
      return (
        <NestedItem
          field={this.props.field}
          form={this.props.form}
          headerText={
            _.get(this.state.items[index], this.props.nestedItemLabel) ||
            `New ${pluralize.singular(this.props.label)}`
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
              /**
               * In the case of historical_relationships field, the options
               * come from historical_persons instead, so it uses the
               * searchLabel prop.
               */
              placeholder={`Search for an existing ${pluralize
                .singular(this.props.searchLabel || this.props.label)
                .toLowerCase()}`}
              /**
               * Filters every property of the option, not just name.
               */
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
