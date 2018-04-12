import React, { Component, Fragment } from 'react';
import { Button, Collapse, Form, Icon, Input, Select } from 'antd';
import _ from 'lodash';

import {
  formItemLayout,
  formItemLayoutWithoutLabel,
  nestedFormItemLayout,
} from '../../data/formLayouts';

const { Option } = Select;
const { Panel } = Collapse;
const FormItem = Form.Item;

const dummyItems = [
  {
    id: 1,
    title: 'Hello',
    author: 'YO',
    year: '2009',
    isbn: '0010',
  },
  {
    id: 2,
    title: 'Bye',
    author: 'BOO',
    year: '2009',
    isbn: '20',
  },
];

class SelectOrCreateItemsField extends Component {
  state = {
    items: [],
    itemKeys: [],
  };

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
        })
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const items = this.state.items.map((item, index) => {
      const isExistingItem = item.id ? true : false;
      return (
        <FormItem
          {...formItemLayoutWithoutLabel}
          key={index}
          style={{ marginBottom: 4 }}
        >
          <Collapse defaultActiveKey={isExistingItem ? null : '1'}>
            <Panel
              key="1"
              header={
                <Fragment>
                  {isExistingItem
                    ? this.state.items[index][this.props.itemFieldsLabel]
                    : getFieldValue(
                        `${this.props.field}s[${index}].${
                          this.props.itemFieldsLabel
                        }`
                      )
                      ? getFieldValue(
                          `${this.props.field}s[${index}].${
                            this.props.itemFieldsLabel
                          }`
                        )
                      : `New ${this.props.field}`}
                  <Icon
                    className="dynamic-delete-button"
                    type="delete"
                    onClick={() => this.removeItem(index)}
                  />
                </Fragment>
              }
            >
              {this.props.itemFields.map(itemField => {
                switch (itemField.type) {
                  case 'id':
                    return (
                      <Fragment key={itemField.field}>
                        {getFieldDecorator(
                          `${this.props.field}s[${index}].id`,
                          {
                            initialValue: isExistingItem
                              ? this.state.items[index].id
                              : null,
                          }
                        )(<Input hidden />)}
                      </Fragment>
                    );
                  case 'charField':
                    return (
                      <FormItem
                        {...nestedFormItemLayout}
                        key={itemField.field}
                        label={itemField.label}
                      >
                        {getFieldDecorator(
                          `${this.props.field}s[${index}].${itemField.field}`,
                          {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: itemField.rules,
                            initialValue: isExistingItem
                              ? this.state.items[index][itemField.field]
                              : null,
                          }
                        )(<Input disabled={isExistingItem} />)}
                      </FormItem>
                    );
                  default:
                    return null;
                }
              })}
            </Panel>
          </Collapse>
        </FormItem>
      );
    });

    return (
      <Fragment>
        <FormItem
          style={{ marginBottom: 4 }}
          {...formItemLayout}
          label={this.props.label}
        >
          <Select
            showSearch
            onSelect={this.addItem}
            placeholder={`Search for an existing ${this.props.field}`}
            filterOption={(input, option) =>
              _.some(option.props.item, value => {
                return (
                  _.isString(value) &&
                  value.toLowerCase().includes(input.toLowerCase())
                );
              })
            }
          >
            {dummyItems.map(item => (
              <Option key={item.id} value={item.id} item={item}>
                {`${item.author}, "${item.title}" (${item.year}) - ISBN ${
                  item.isbn
                }`}
              </Option>
            ))}
          </Select>
        </FormItem>
        {items}
        <FormItem {...formItemLayoutWithoutLabel}>
          <Button
            type="dashed"
            onClick={this.addItem}
            style={{ width: '100%' }}
          >
            <Icon type="plus" /> Create new {this.props.field}
          </Button>
        </FormItem>
      </Fragment>
    );
  }
}

export default SelectOrCreateItemsField;
