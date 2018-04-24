import React, { Component } from 'react';
import { Form, Select } from 'antd';

import { formItemLayout } from '../../../data/formLayouts';
import { tagsFieldRules } from '../../../data/fieldRules';

const FormItem = Form.Item;
const { Option } = Select;

class TagField extends Component {
  state = {
    options: [],
  };

  handleChange = value => {
    this.setState({ options: this.props.options.concat({ name: value }) });
  };

  renderOptions = () => {
    let options =
      this.state.options.length > 0 ? this.state.options : this.props.options;
    return options.map(option => {
      return (
        <Option key={option.name} value={option.name}>
          {option.name}
        </Option>
      );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={this.props.label}>
        {getFieldDecorator(this.props.field, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [tagsFieldRules],
          initialValue: [],
        })(
          <Select
            showSearch
            mode="combobox"
            style={{ width: '100%' }}
            onChange={this.handleChange}
          >
            {this.renderOptions()}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default TagField;
