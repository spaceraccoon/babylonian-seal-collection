import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Form, Input, message, Radio, Select, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import './SealForm.css';
import CharField from './components/CharField/CharField';
import FloatField from './components/FloatField/FloatField';
import TagsField from './components/TagsField/TagsField';
import NestedItemsField from './components/NestedItemsField/NestedItemsField';
import { formItemLayout, formItemLayoutWithoutLabel } from './data/formLayouts';
import {
  publicationFields,
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
const RadioGroup = Radio.Group;

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

class SealForm extends Component {
  state = {
    isLoading: true,
    seal: null,
    materials: [],
    iconographicElements: [],
    scenes: [],
    artStyles: [],
    periods: [],
    publications: [],
    texts: [],
    languages: [],
    images: [],
    historicalPersons: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values = {
          ...values,
          materials: mapNamesToObject(values.materials),
          iconographic_elements: mapNamesToObject(values.iconographic_elements),
          scenes: mapNamesToObject(values.scenes),
          art_styles: mapNamesToObject(values.art_styles),
          periods: mapNamesToObject(values.periods),
          publications: values.publications || [],
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
        };
        console.log(values);
        if (this.props.edit) {
          this.setState({
            seal: await updateResource(this.props.seal.id, values, 'seal'),
          });
        } else {
          this.setState({
            seal: await createResource(values, 'seal'),
          });
        }
      } else {
        message.error('Invalid data. Please check form fields.');
      }
    });
  };

  async componentDidMount() {
    this.setState({
      materials: await fetchResources('material'),
      iconographicElements: await fetchResources('iconographicelement'),
      scenes: await fetchResources('scene'),
      artStyles: await fetchResources('artstyle'),
      periods: await fetchResources('period'),
      publications: await fetchResources('publication'),
      texts: await fetchResources('text'),
      languages: await fetchResources('language'),
      historicalPersons: await mapHistoricalPersonOptions(),
      isLoading: false,
    });
  }

  render() {
    if (this.state.seal) {
      return <Redirect to={`/seal/${this.state.seal.id}/`} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin
        spinning={Boolean(
          this.state.isLoading || (this.props.edit && !this.props.seal)
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
          <h2>Physical</h2>
          <FloatField
            form={this.props.form}
            label="Height (mm)"
            field="height"
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
          <FloatField
            form={this.props.form}
            label="Drill Hole Diameter (mm)"
            field="drill_hole_diameter"
          />
          <CharField
            form={this.props.form}
            label="Perforations"
            field="perforations"
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
          {(!this.props.edit || this.props.seal) && (
            <NestedItemsField
              field="historical_relationships"
              form={this.props.form}
              options={this.state.historicalPersons}
              initialItems={
                this.props.seal ? this.props.seal.historical_relationships : []
              }
              itemFields={historicalRelationshipFields}
              nestedItemLabel="historical_person.name"
              label="Historical Relationships"
              searchLabel="historical person"
            />
          )}
          {(!this.props.edit || this.props.seal) && (
            <NestedItemsField
              field="texts"
              form={this.props.form}
              nestedOptions={{
                languages: this.state.languages,
              }}
              options={remapNestedItems(this.state.texts, 'languages')}
              initialItems={
                this.props.seal
                  ? remapNestedItems(this.props.seal.texts, 'languages')
                  : []
              }
              itemFields={textFields}
              nestedItemLabel="title"
              label="Texts"
            />
          )}
          <h2>Design</h2>
          <FormItem {...formItemLayout} label="Design Type">
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
          <TagsField
            form={this.props.form}
            label="Scenes"
            field="scenes"
            options={this.state.scenes}
          />
          <TagsField
            form={this.props.form}
            label="Art Styles"
            field="art_styles"
            options={this.state.artStyles}
          />
          <TagsField
            form={this.props.form}
            label="Iconographic Elements"
            field="iconographic_elements"
            options={this.state.iconographicElements}
          />
          <h2>Images</h2>
          {(!this.props.edit || this.props.seal) && (
            <NestedItemsField
              field="images"
              form={this.props.form}
              initialItems={this.props.seal ? this.props.seal.images : []}
              itemFields={imageFields}
              nestedItemLabel="name"
              label="Images"
            />
          )}
          <h2>Bibliography</h2>
          {(!this.props.edit || this.props.seal) && (
            <NestedItemsField
              field="publications"
              form={this.props.form}
              options={this.state.publications}
              initialItems={this.props.seal ? this.props.seal.publications : []}
              itemFields={publicationFields}
              nestedItemLabel="title"
              label="Publications"
            />
          )}
          <FormItem {...formItemLayoutWithoutLabel}>
            <Button type="primary" htmlType="submit">
              {this.props.edit ? (
                <Fragment>Update</Fragment>
              ) : (
                <Fragment>Create</Fragment>
              )}
            </Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

const WrappedSealForm = Form.create({
  mapPropsToFields(props) {
    if (props.seal) {
      let newFields = _.mapValues(props.seal, (field, key) => {
        if (
          [
            'materials',
            'iconographic_elements',
            'scenes',
            'art_styles',
            'periods',
            'languages',
          ].includes(key)
        ) {
          return mapNameToFormField(field);
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
})(SealForm);

export default WrappedSealForm;
