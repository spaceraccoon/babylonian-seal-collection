/**
 * Different form item layouts. See
 * https://ant.design/components/form/#Form.Item.
 */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 12 },
  },
};

const formItemLayoutWithoutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    lg: {
      span: 12,
      offset: 4,
    },
  },
};

const nestedFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 20 },
  },
};

const nestedFormItemLayoutWithoutLabel = {
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 20, offset: 4 },
  },
};

export {
  formItemLayout,
  formItemLayoutWithoutLabel,
  nestedFormItemLayout,
  nestedFormItemLayoutWithoutLabel,
};
