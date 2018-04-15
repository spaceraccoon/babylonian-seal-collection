import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';

import { formItemLayout } from '../../data/formLayouts';
import { floatFieldRules } from '../../data/fieldRules';

const FormItem = Form.Item;

class FloatField extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={this.props.label}>
        {getFieldDecorator(this.props.field, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [floatFieldRules],
        })(<InputNumber step={0.01} />)}
      </FormItem>
    );
  }
}

export default FloatField;
