import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createText = async text => {
  try {
    await axios.post('/api/text/', text);
    message.success('Created text.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchTexts = async () => {
  try {
    const { data } = await axios.get('/api/text/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch texts.');
    return null;
  }
};

const updateText = async (id, text) => {
  try {
    let { data } = await axios.patch(`/api/text/${id}/`, text, getHeaders());
    message.success('Updated text.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteText = async (id, callback) => {
  try {
    await await axios.delete(`/api/text/${id}/`, getHeaders());
    message.success('Deleted text.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete text.');
    return false;
  }
};

export { createText, fetchTexts, updateText, deleteText };
