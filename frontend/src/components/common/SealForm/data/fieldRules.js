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

export { charFieldRules, requiredCharFieldRules, floatFieldRules };
