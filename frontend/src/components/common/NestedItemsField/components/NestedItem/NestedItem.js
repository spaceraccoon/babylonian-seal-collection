import React, { Component, Fragment } from 'react';
import {
  Button,
  Collapse,
  Form,
  Icon,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { fetchSignedUrl } from '../../../../../api/uploadApi';
import {
  formItemLayoutWithoutLabel,
  nestedFormItemLayout,
} from '../../../../../data/formLayouts';

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const FormItem = Form.Item;

/**
 * Check if the field of a nested item can be edited by checking the edit
 * permissions of the direct parent . E.g. for the historical_person.name field
 * of a historical_relationship, it checks can_edit of historical_person rather
 * than historical_relationship.
 * @param {!Object} item
 * @param {string} field
 */
const canEdit = (item, field) => {
  let parentKey = field
    .split('.')
    .slice(0, -1)
    .join('');
  let canEditPath = parentKey ? `${parentKey}.can_edit` : 'can_edit';
  return _.get(item, canEditPath, true);
};

/**
 * Nested field component that displays the corresponding field type for a
 * nested item.
 */
class NestedItem extends Component {
  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue,
    } = this.props.form;

    /**
     * Check if item is a new or existing option.
     */
    const isExistingItem = _.has(this.props.item, 'id');

    return (
      <FormItem {...formItemLayoutWithoutLabel} style={{ marginBottom: 4 }}>
        <Collapse defaultActiveKey={isExistingItem ? null : '1'}>
          <Panel
            forceRender
            key="1"
            header={
              <Fragment>
                {this.props.headerText}
                <Icon
                  className="dynamic-delete-button"
                  type="delete"
                  onClick={() => this.props.removeItem(this.props.index)}
                />
              </Fragment>
            }
          >
            {this.props.itemFields.map(itemField => {
              switch (itemField.type) {
                /**
                 * Since id should not be changed but must be submitted to the
                 * API when updating resources, it is included as a hidden
                 * input.
                 */
                case 'id':
                  return (
                    <FormItem key={itemField.field}>
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            null
                          ),
                        }
                      )(<Input hidden />)}
                    </FormItem>
                  );
                case 'charField':
                  return (
                    <FormItem
                      {...nestedFormItemLayout}
                      key={itemField.field}
                      label={itemField.label}
                    >
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: itemField.rules,
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            ''
                          ),
                        }
                      )(
                        <Input
                          disabled={!canEdit(this.props.item, itemField.field)}
                        />
                      )}
                    </FormItem>
                  );
                case 'yearField':
                  return (
                    <FormItem
                      {...nestedFormItemLayout}
                      key={itemField.field}
                      label={itemField.label}
                    >
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: itemField.rules,
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            null
                          ),
                        }
                      )(
                        <InputNumber
                          disabled={!canEdit(this.props.item, itemField.field)}
                          min={0}
                          max={new Date().getFullYear()}
                        />
                      )}
                    </FormItem>
                  );
                case 'textField':
                  return (
                    <FormItem
                      {...nestedFormItemLayout}
                      key={itemField.field}
                      label={itemField.label}
                    >
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: itemField.rules,
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            ''
                          ),
                        }
                      )(
                        <TextArea
                          disabled={!canEdit(this.props.item, itemField.field)}
                          rows={4}
                        />
                      )}
                    </FormItem>
                  );
                case 'tagsField':
                  return (
                    <FormItem
                      {...nestedFormItemLayout}
                      key={itemField.field}
                      label={itemField.label}
                    >
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: itemField.rules,
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            []
                          ),
                        }
                      )(
                        <Select
                          mode="tags"
                          style={{ width: '100%' }}
                          tokenSeparators={[',']}
                        >
                          {this.props.nestedOptions[itemField.field].map(
                            option => {
                              return (
                                <Option key={option.id} value={option.name}>
                                  {option.name}
                                </Option>
                              );
                            }
                          )}
                        </Select>
                      )}
                    </FormItem>
                  );
                case 'image':
                  return (
                    <FormItem
                      {...nestedFormItemLayout}
                      key={itemField.field}
                      label={itemField.label}
                    >
                      {getFieldDecorator(
                        `${this.props.field}[${this.props.index}].${
                          itemField.field
                        }`,
                        {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: itemField.rules,
                          initialValue: _.get(
                            this.props.item,
                            itemField.field,
                            ''
                          ),
                        }
                      )(<Input disabled />)}
                      <Upload
                        onRemove={file => {
                          setFieldsValue({
                            [`${this.props.field}[${this.props.index}].${
                              itemField.field
                            }`]: null,
                          });
                        }}
                        customRequest={async ({
                          onSuccess,
                          onError,
                          onProgress,
                          file,
                        }) => {
                          try {
                            let { signedUrl, key } = await fetchSignedUrl(
                              'put_object',
                              file.name,
                              file.type
                            );
                            await axios.put(signedUrl, file, {
                              headers: {
                                'Content-Type': file.type,
                              },
                              onUploadProgress: progressEvent =>
                                onProgress({
                                  percent:
                                    progressEvent.loaded /
                                    progressEvent.total *
                                    100,
                                }),
                            });
                            setFieldsValue({
                              [`${this.props.field}[${this.props.index}].${
                                itemField.field
                              }`]: key,
                            });
                            onSuccess(file);
                          } catch (error) {
                            onError(error);
                          }
                        }}
                        name="image"
                        listType="picture"
                        accept="image/*"
                      >
                        {getFieldValue(
                          `${this.props.field}[${this.props.index}].${
                            itemField.field
                          }`
                        ) ? null : (
                          <Button>
                            <Icon type="upload" /> Click to upload
                          </Button>
                        )}
                      </Upload>
                    </FormItem>
                  );
                default:
                  return null;
              }
            })}
          </Panel>
        </Collapse>
      </FormItem>
    );
  }
}

export default NestedItem;
