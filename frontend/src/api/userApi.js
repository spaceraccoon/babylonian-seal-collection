import axios from 'axios';
import { message } from 'antd';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createUser = async user => {
  try {
    await axios.post('/api/user/', user);
    message.success('Created user.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

export { createUser };
