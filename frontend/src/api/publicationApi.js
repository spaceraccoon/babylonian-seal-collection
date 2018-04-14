import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createPublication = async publication => {
  try {
    await axios.post('/api/publication/', publication);
    message.success('Created publication.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchPublications = async () => {
  try {
    const { data } = await axios.get('/api/publication/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch publications.');
    return null;
  }
};

const updatePublication = async (id, publication) => {
  try {
    let { data } = await axios.patch(
      `/api/publication/${id}/`,
      publication,
      getHeaders()
    );
    message.success('Updated publication.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deletePublication = async (id, callback) => {
  try {
    await await axios.delete(`/api/publication/${id}/`, getHeaders());
    message.success('Deleted publication.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete publication.');
    return false;
  }
};

export {
  createPublication,
  fetchPublications,
  updatePublication,
  deletePublication,
};
