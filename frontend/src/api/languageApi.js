import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createLanguage = async language => {
  try {
    await axios.post('/api/language/', language);
    message.success('Created language.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchLanguages = async () => {
  try {
    const { data } = await axios.get('/api/language/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch languages.');
    return null;
  }
};

const updateLanguage = async (id, language) => {
  try {
    let { data } = await axios.patch(
      `/api/language/${id}/`,
      language,
      getHeaders()
    );
    message.success('Updated language.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteLanguage = async (id, callback) => {
  try {
    await await axios.delete(`/api/language/${id}/`, getHeaders());
    message.success('Deleted language.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete language.');
    return false;
  }
};

export { createLanguage, fetchLanguages, updateLanguage, deleteLanguage };
