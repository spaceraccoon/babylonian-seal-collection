import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createArtStyle = async artStyle => {
  try {
    await axios.post('/api/artstyle/', artStyle);
    message.success('Created art style.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchArtStyles = async () => {
  try {
    const { data } = await axios.get('/api/artstyle/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch art styles.');
    return null;
  }
};

const updateArtStyle = async (id, artStyle) => {
  try {
    let { data } = await axios.patch(
      `/api/artstyle/${id}/`,
      artStyle,
      getHeaders()
    );
    message.success('Updated art style.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteArtStyle = async (id, callback) => {
  try {
    await await axios.delete(`/api/artstyle/${id}/`, getHeaders());
    message.success('Deleted art style.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete art style.');
    return false;
  }
};

export { createArtStyle, fetchArtStyles, updateArtStyle, deleteArtStyle };
