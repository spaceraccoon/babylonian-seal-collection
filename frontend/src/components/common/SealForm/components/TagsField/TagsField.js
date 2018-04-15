import React, { Component } from 'react';
import { Form, Select } from 'antd';

import { formItemLayout } from '../../data/formLayouts';
import { tagsFieldRules } from '../../data/fieldRules';

const FormItem = Form.Item;
const { Option } = Select;

class TagsField extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={this.props.label}>
        {getFieldDecorator(this.props.field, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [tagsFieldRules],
          initialValue: [],
        })(
          <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
            {this.props.options.map(option => {
              return (
                <Option key={option.id} value={option.name}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default TagsField;
