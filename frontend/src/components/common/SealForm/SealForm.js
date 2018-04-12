import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Form, Input, message, Radio, Select } from 'antd';
import { Redirect } from 'react-router-dom';

import './SealForm.css';
import CharField from './components/CharField/CharField';
import FloatField from './components/FloatField/FloatField';
import TagsField from './components/TagsField/TagsField';
import SelectOrCreateItemsField from './components/SelectOrCreateItemsField/SelectOrCreateItemsField';
import { formItemLayout, formItemLayoutWithoutLabel } from './data/formLayouts';
import { publicationFields } from './data/itemFields';
import { createSeal, updateSeal } from '../../../api/sealApi';
import { fetchMaterials } from '../../../api/materialApi';
import { fetchIconographicElements } from '../../../api/iconographicElementApi';
import { fetchScenes } from '../../../api/sceneApi';
import { fetchArtStyles } from '../../../api/artStyleApi';
import { fetchPeriods } from '../../../api/periodApi';

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

class SealForm extends Component {
  state = {
    seal: null,
    materials: [],
    iconographicElements: [],
    scenes: [],
    artStyles: [],
    periods: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        // values = {
        //   ...values,
        //   materials: mapNamesToObject(values.materials),
        //   iconographic_elements: mapNamesToObject(values.iconographic_elements),
        //   scenes: mapNamesToObject(values.scenes),
        //   art_styles: mapNamesToObject(values.art_styles),
        //   periods: mapNamesToObject(values.periods),
        // };
        // if (this.props.seal) {
        //   this.setState({
        //     seal: await updateSeal(this.props.seal.id, values),
        //   });
        // } else {
        //   this.setState({
        //     seal: await createSeal(values),
        //   });
        // }
      } else {
        message.error('Invalid data. Please check form fields.');
      }
    });
  };

  async componentDidMount() {
    this.setState({
      materials: await fetchMaterials(),
      iconographicElements: await fetchIconographicElements(),
      scenes: await fetchScenes(),
      artStyles: await fetchArtStyles(),
      periods: await fetchPeriods(),
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return this.state.seal ? (
      <Redirect to={`/seal/${this.state.seal.id}`} />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <h2>Identification</h2>
        <CharField form={this.props.form} label="Name" field="name" required />
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
        <FloatField form={this.props.form} label="Height (mm)" field="height" />
        <FloatField
          form={this.props.form}
          label="Thickness (mm)"
          field="thickness"
        />
        <FloatField form={this.props.form} label="Width (mm)" field="width" />
        <FloatField form={this.props.form} label="Weight (g)" field="weight" />
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
        <h2>Bibliography</h2>
        <SelectOrCreateItemsField
          field="publication"
          form={this.props.form}
          itemFields={publicationFields}
          itemFieldsLabel="title"
          label="Publications"
        />
        <FormItem {...formItemLayoutWithoutLabel}>
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
        if (
          [
            'materials',
            'iconographic_elements',
            'scenes',
            'art_styles',
            'periods',
          ].includes(key)
        ) {
          return mapNameToFormField(field);
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
