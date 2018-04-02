import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Form, Input, InputNumber, Select, Slider, Switch } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

class SealForm extends Component {
  handleSubmit = e => {
    try {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          let response = this.props.seal
            ? await axios.patch(`/api/seal/${this.props.seal.id}/`, values)
            : await axios.post('/api/seal/', values);
          console.log(response);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Identification</h2>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="CDLI Number">
          {getFieldDecorator('cdli_number', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Museum Number">
          {getFieldDecorator('museum_number', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Accession Number">
          {getFieldDecorator('accession_number', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Publication Number">
          {getFieldDecorator('publication_number', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Collection">
          {getFieldDecorator('collection', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <h2>Physical</h2>
        <FormItem {...formItemLayout} label="Height (mm)">
          {getFieldDecorator('height', {
            rules: [
              {
                min: 0,
                type: 'number',
                message: 'Please input a positive value!',
              },
            ],
          })(<InputNumber step={0.01} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Thickness (mm)">
          {getFieldDecorator('thickness', {
            rules: [
              {
                min: 0,
                type: 'number',
                message: 'Please input a positive value!',
              },
            ],
          })(<InputNumber step={0.01} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Width (mm)">
          {getFieldDecorator('width', {
            rules: [
              {
                min: 0,
                type: 'number',
                message: 'Please input a positive value!',
              },
            ],
          })(<InputNumber step={0.01} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Weight (g)">
          {getFieldDecorator('weight', {
            rules: [
              {
                min: 0,
                type: 'number',
                message: 'Please input a positive value!',
              },
            ],
          })(<InputNumber step={0.01} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Drill Hole Diameter (mm)">
          {getFieldDecorator('drill_hole_diameter', {
            rules: [
              {
                min: 0,
                type: 'number',
                message: 'Please input a positive value!',
              },
            ],
          })(<InputNumber step={0.01} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Perforations">
          {getFieldDecorator('perforations', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Surface Preservation">
          {getFieldDecorator('surface_preservation')(
            <Slider
              max={3}
              marks={{ 0: 'Poor', 1: 'Fair', 2: 'Good', 3: 'Excellent' }}
              tipFormatter={null}
              dots
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Condition">
          {getFieldDecorator('condition')(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Is Recarved">
          {getFieldDecorator('is_recarved')(<Switch />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Physical Remarks">
          {getFieldDecorator('physical_remarks')(<TextArea rows={4} />)}
        </FormItem>
        <h2>Origin</h2>
        <FormItem {...formItemLayout} label="Provenance">
          {getFieldDecorator('provenance')(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Provenance Remarks">
          {getFieldDecorator('provenance_remarks')(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Excavation Number">
          {getFieldDecorator('excavation_number', {
            rules: [
              {
                max: 255,
                message: 'Please input a string of maximum 255 characters!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <h2>Design</h2>
        <FormItem {...formItemLayout} label="Style">
          {getFieldDecorator('design')(
            <Select>
              <Option value="FIGURATIVE">Figurative</Option>
              <Option value="GEOMETRIC">Geometric</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Design Remarks">
          {getFieldDecorator('design_remarks')(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {this.props.seal ? (
              <Fragment>Update</Fragment>
            ) : (
              <Fragment>Create</Fragment>
            )}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSealForm = Form.create({
  mapPropsToFields(props) {
    if (props.seal) {
      console.log(props.seal);
      let newFields = _.mapValues(props.seal, field => {
        return Form.createFormField({
          value: field,
        });
      });
      console.log(newFields);
      return newFields;
    } else {
      return;
    }
  },
})(SealForm);

export default WrappedSealForm;
