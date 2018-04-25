import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Form, Input, message, Select, Spin } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import './ImpressionForm.css';
import CharField from '../CharField/CharField';
import FloatField from '../FloatField/FloatField';
import TagsField from '../TagsField/TagsField';
import NestedItemsField from '../NestedItemsField/NestedItemsField';
import MultiSelectField from '../MultiSelectField/MultiSelectField';
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

const mapPropertyToObject = (propertyArray, property) =>
  propertyArray.map(propertyItem => {
    return {
      [property]: propertyItem,
    };
  });

const mapPropertyToFormField = (field, property) =>
  Form.createFormField({
    value: field.map(item => _.get(item, property)),
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
          materials: mapPropertyToObject(values.materials, 'name'),
          periods: mapPropertyToObject(values.periods, 'name'),
          languages: mapPropertyToObject(values.languages, 'name'),
          texts: values.texts
            ? values.texts.map(text => {
                return {
                  ...text,
                  languages: mapPropertyToObject(text.languages, 'name'),
                };
              })
            : [],
          images: values.images || [],
          historical_relationships: values.historical_relationships || [],
          object_types: mapPropertyToObject(values.object_types, 'name'),
          seals: mapPropertyToObject(values.seals, 'id'),
        };
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
          <MultiSelectField
            form={this.props.form}
            label="Created from Seals"
            field="seals"
            options={this.state.seals}
          />
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
          <TagsField
            form={this.props.form}
            label="Object Types"
            field="object_types"
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
        if (
          ['materials', 'periods', 'languages', 'object_types'].includes(key)
        ) {
          return mapPropertyToFormField(field, 'name');
        }
        if (key === 'seals') {
          return mapPropertyToFormField(field, 'id');
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
