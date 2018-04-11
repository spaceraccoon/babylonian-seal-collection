import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Form, Input, InputNumber, message, Radio, Select } from 'antd';
import { Redirect } from 'react-router-dom';

import { createSeal, updateSeal } from '../../../api/sealApi';
import { fetchMaterials } from '../../../api/materialApi';

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 10 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    lg: {
      span: 16,
      offset: 3,
    },
  },
};

class SealForm extends Component {
  state = {
    seal: null,
    materials: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.materials) {
          values.materials = values.materials.map(material => {
            return {
              name: material,
            };
          });
        }
        if (this.props.seal) {
          this.setState({
            seal: await updateSeal(this.props.seal.id, values),
          });
        } else {
          this.setState({
            seal: await createSeal(values),
          });
        }
      } else {
        message.error('Invalid data. Please check form fields.');
      }
    });
  };

  async componentDidMount() {
    this.setState({
      materials: await fetchMaterials(),
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return this.state.seal ? (
      <Redirect to={`/seal/${this.state.seal.id}`} />
    ) : (
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
        <FormItem {...formItemLayout} label="Materials">
          {getFieldDecorator('materials', {})(
            <Select
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            >
              {this.state.materials.map(material => {
                return (
                  <Option key={material.id} value={material.name}>
                    {material.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Surface Preservation">
          {getFieldDecorator('surface_preservation')(
            <Select>
              <Option value={0}>Poor</Option>
              <Option value={1}>Fair</Option>
              <Option value={2}>Good</Option>
              <Option value={3}>Excellent</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Condition">
          {getFieldDecorator('condition')(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Is Recarved">
          {getFieldDecorator('is_recarved')(
            <RadioGroup>
              <Radio value={true}>True</Radio>
              <Radio value={false}>False</Radio>
            </RadioGroup>
          )}
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
      let newFields = _.mapValues(props.seal, (field, key) => {
        if (key === 'materials') {
          return Form.createFormField({
            value: field.map(material => material.name),
          });
        }
        return Form.createFormField({
          value: field,
        });
      });
      return newFields;
    } else {
      return;
    }
  },
})(SealForm);

export default WrappedSealForm;
