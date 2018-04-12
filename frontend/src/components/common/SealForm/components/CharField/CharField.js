import React, { Component } from 'react';
import { Form, Input } from 'antd';

import { formItemLayout } from '../../data/formLayouts';
import { charFieldRules, requiredCharFieldRules } from '../../data/fieldRules';
const FormItem = Form.Item;

class CharField extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={this.props.label}>
        {getFieldDecorator(this.props.field, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            charFieldRules,
            this.props.required ? requiredCharFieldRules : {},
          ],
        })(<Input />)}
      </FormItem>
    );
  }
}

export default CharField;
