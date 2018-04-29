/**
 * Validation rules for different types of form fields. See
 * https://ant.design/components/form/#Validation-Rules.
 */

import _ from 'lodash';

const charFieldRules = {
  max: 255,
  message: 'Please input a string of maximum 255 characters!',
};

const requiredCharFieldRules = {
  required: true,
  whitespace: true,
  message: 'This field is required!',
};

const numberRules = {
  validator: (rule, value, callback) =>
    !value || (!isNaN(value) && value > 0) ? callback() : callback(false),
  message: 'Please input a valid number!',
};

const tagsFieldRules = {
  validator: (rule, value, callback) =>
    !value || !_.some(value, tag => tag.length > 255)
      ? callback()
      : callback(false),
  message: 'Each entry should be a maximum of 255 characters!',
};

export { charFieldRules, requiredCharFieldRules, numberRules, tagsFieldRules };
