import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Form, Input, message, Select, Spin } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import './ImpressionForm.css';
import CharField from '../CharField/CharField';
import FloatField from '../FloatField/FloatField';
import TagField from '../TagField/TagField';
import TagsField from '../TagsField/TagsField';
import NestedItemsField from '../NestedItemsField/NestedItemsField';
import {
  formItemLayout,
  formItemLayoutWithoutLabel,
} from '../../../data/formLayouts';
import {
  textFields,
  imageFields,
  historicalRelationshipFields,
} from '../../../data/itemFields';
import {
  createResource,
  fetchResources,
  updateResource,
} from '../../../api/resourceApi';

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;

const mapNamesToObject = names =>
  names.map(name => {
    return {
      name,
    };
  });

const mapNameToFormField = field =>
  Form.createFormField({
    value: field.map(item => item.name),
  });

const remapNestedItems = (field, nestedItemKey) =>
  field.map(nestedItem => {
    return {
      ...nestedItem,
      [nestedItemKey]: Array.isArray(nestedItem[nestedItemKey])
        ? nestedItem[nestedItemKey].map(value => value.name)
        : nestedItem[nestedItemKey] ? nestedItem[nestedItemKey].name : null,
    };
  });

const mapHistoricalPersonOptions = async () => {
  let historicalPersons = await fetchResources('historicalperson');
  return historicalPersons.map(historical_person => {
    return {
      historical_person,
    };
  });
};

class ImpressionForm extends Component {
  state = {
    isLoading: true,
    impression: null,
    seals: [],
    materials: [],
    periods: [],
    texts: [],
    languages: [],
    images: [],
    historicalPersons: [],
    objectTypes: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values = {
          ...values,
          materials: mapNamesToObject(values.materials),
          periods: mapNamesToObject(values.periods),
          languages: mapNamesToObject(values.languages),
          texts: values.texts
            ? values.texts.map(text => {
                return {
                  ...text,
                  languages: mapNamesToObject(text.languages),
                };
              })
            : [],
          images: values.images || [],
          historical_relationships: values.historical_relationships || [],
          object_type:
            values.object_type && values.object_type.length > 0
              ? { name: values.object_type }
              : null,
        };
        console.log(values);
        if (this.props.edit) {
          this.setState({
            impression: await updateResource(
              this.props.impression.id,
              values,
              'impression'
            ),
          });
        } else {
          this.setState({
            impression: await createResource(values, 'impression'),
          });
        }
      } else {
        message.error('Invalid data. Please check form fields.');
      }
    });
  };

  async componentDidMount() {
    this.setState({
      seals: await fetchResources('seal'),
      materials: await fetchResources('material'),
      periods: await fetchResources('period'),
      texts: await fetchResources('text'),
      languages: await fetchResources('language'),
      historicalPersons: await mapHistoricalPersonOptions(),
      objectTypes: await fetchResources('objecttype'),
      isLoading: false,
    });
  }

  render() {
    if (this.state.impression) {
      return <Redirect to={`/impression/${this.state.impression.id}/`} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin
        spinning={Boolean(
          this.state.isLoading || (this.props.edit && !this.props.impression)
        )}
      >
        <Form onSubmit={this.handleSubmit}>
          <h2>Identification</h2>
          <CharField
            form={this.props.form}
            label="Name"
            field="name"
            required
          />
          <CharField
            form={this.props.form}
            label="CDLI Number"
            field="cdli_number"
          />
          <CharField form={this.props.form} label="P Number" field="p_number" />
          <CharField
            form={this.props.form}
            label="Museum Number"
            field="museum_number"
          />
          <CharField
            form={this.props.form}
            label="Accession Number"
            field="accession_number"
          />
          <CharField
            form={this.props.form}
            label="Publication Number"
            field="publication_number"
          />
          <CharField
            form={this.props.form}
            label="Collection"
            field="collection"
          />
          <FormItem {...formItemLayout} label="Seal">
            {getFieldDecorator('seal')(
              <Select>
                {this.state.seals.map(seal => (
                  <Option key={seal.id} value={seal.id}>
                    {seal.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <h2>Physical</h2>
          <FloatField
            form={this.props.form}
            label="Length (mm)"
            field="length"
          />
          <FloatField
            form={this.props.form}
            label="Thickness (mm)"
            field="thickness"
          />
          <FloatField form={this.props.form} label="Width (mm)" field="width" />
          <FloatField
            form={this.props.form}
            label="Weight (g)"
            field="weight"
          />
          <TagsField
            form={this.props.form}
            label="Materials"
            field="materials"
            options={this.state.materials}
          />
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
          <TagField
            form={this.props.form}
            label="Object Type"
            field="object_type"
            options={this.state.objectTypes}
          />
          <FormItem {...formItemLayout} label="Physical Remarks">
            {getFieldDecorator('physical_remarks')(<TextArea rows={4} />)}
          </FormItem>
          <h2>Origin</h2>
          <TagsField
            form={this.props.form}
            label="Periods"
            field="periods"
            options={this.state.periods}
          />
          <FormItem {...formItemLayout} label="Provenance">
            {getFieldDecorator('provenance')(<TextArea rows={4} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Provenance Remarks">
            {getFieldDecorator('provenance_remarks')(<TextArea rows={4} />)}
          </FormItem>
          <CharField
            form={this.props.form}
            label="Excavation Number"
            field="excavation_number"
          />
          <h2>Content</h2>
          <TagsField
            form={this.props.form}
            label="Languages"
            field="languages"
            options={this.state.languages}
          />
          {(!this.props.edit || this.props.impression) && (
            <NestedItemsField
              field="historical_relationships"
              form={this.props.form}
              options={this.state.historicalPersons}
              initialItems={
                this.props.impression
                  ? this.props.impression.historical_relationships
                  : []
              }
              itemFields={historicalRelationshipFields}
              nestedItemLabel="historical_person.name"
              label="Historical Relationships"
              searchLabel="historical person"
            />
          )}
          {(!this.props.edit || this.props.impression) && (
            <NestedItemsField
              field="texts"
              form={this.props.form}
              nestedOptions={{
                languages: this.state.languages,
              }}
              options={remapNestedItems(this.state.texts, 'languages')}
              initialItems={
                this.props.impression
                  ? remapNestedItems(this.props.impression.texts, 'languages')
                  : []
              }
              itemFields={textFields}
              nestedItemLabel="title"
              label="Texts"
            />
          )}
          <h2>Images</h2>
          {(!this.props.edit || this.props.impression) && (
            <NestedItemsField
              field="images"
              form={this.props.form}
              initialItems={
                this.props.impression ? this.props.impression.images : []
              }
              itemFields={imageFields}
              nestedItemLabel="name"
              label="Images"
            />
          )}
          <FormItem {...formItemLayoutWithoutLabel}>
            <Button
              className="impression-form__button"
              type="primary"
              htmlType="submit"
            >
              {this.props.edit ? (
                <Fragment>Update</Fragment>
              ) : (
                <Fragment>Create</Fragment>
              )}
            </Button>
            <Link
              to={
                (this.props.location && this.props.location.state.from) || '/'
              }
            >
              <Button>Cancel</Button>
            </Link>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

const WrappedImpressionForm = Form.create({
  mapPropsToFields(props) {
    if (props.impression) {
      let newFields = _.mapValues(props.impression, (field, key) => {
        if (['materials', 'periods', 'languages'].includes(key)) {
          return mapNameToFormField(field);
        }
        if (key === 'object_type') {
          return Form.createFormField({
            value: field ? field.name : '',
          });
        }
        if (key === 'texts') {
          return Form.createFormField({
            value: remapNestedItems(field, 'languages'),
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
})(ImpressionForm);

export default WrappedImpressionForm;
