import React, { Component, Fragment } from 'react';
import { Button, Collapse, Form, Icon, Input, InputNumber, Select } from 'antd';
import _ from 'lodash';

import {
  formItemLayout,
  formItemLayoutWithoutLabel,
  nestedFormItemLayout,
} from '../../data/formLayouts';

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const FormItem = Form.Item;

class NestedItemsField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.initialItems,
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
              forceRender
              key="1"
              header={
                <Fragment>
                  {getFieldValue(
                    `${this.props.field}s[${index}].${
                      this.props.nestedItemLabel
                    }`
                  ) ||
                    this.state.items[index][this.props.nestedItemLabel] ||
                    `New ${this.props.field}`}
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
                              : '',
                          }
                        )(
                          <Input disabled={isExistingItem && !item.can_edit} />
                        )}
                      </FormItem>
                    );
                  case 'yearField':
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
                        )(
                          <InputNumber
                            disabled={isExistingItem && !item.can_edit}
                            min={0}
                            max={new Date().getFullYear()}
                          />
                        )}
                      </FormItem>
                    );
                  case 'textField':
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
                              : '',
                          }
                        )(
                          <TextArea
                            disabled={isExistingItem && !item.can_edit}
                            rows={4}
                          />
                        )}
                      </FormItem>
                    );
                  case 'tagsField':
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
                              : [],
                          }
                        )(
                          <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                          >
                            {this.props.nestedOptions[itemField.field].map(
                              option => {
                                return (
                                  <Option key={option.id} value={option.name}>
                                    {option.name}
                                  </Option>
                                );
                              }
                            )}
                          </Select>
                        )}
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
            {this.props.options.map(item => {
              return (
                <Option key={item.id} value={item.id} item={item}>
                  <Fragment>{item[this.props.nestedItemLabel]}</Fragment>
                </Option>
              );
            })}
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

export default NestedItemsField;
