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

const floatFieldRules = {
  min: 0,
  type: 'number',
  message: 'Please input a positive value!',
};

const tagsFieldRules = {
  validator: (rule, value, callback) =>
    !value || !_.some(value, tag => tag.length > 255)
      ? callback()
      : callback(false),
  message: 'Each entry should be a maximum of 255 characters!',
};

export {
  charFieldRules,
  requiredCharFieldRules,
  floatFieldRules,
  tagsFieldRules,
};
