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

const formItemLayoutWithoutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    lg: {
      span: 10,
      offset: 3,
    },
  },
};

const nestedFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 21 },
  },
};

const nestedFormItemLayoutWithoutLabel = {
  wrapperCol: {
    xs: { span: 24 },
  },
};

export {
  formItemLayout,
  formItemLayoutWithoutLabel,
  nestedFormItemLayout,
  nestedFormItemLayoutWithoutLabel,
};
