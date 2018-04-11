import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createMaterial = async material => {
  try {
    await axios.post('/api/material/', material);
    message.success('Created material.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchMaterials = async () => {
  try {
    const { data } = await axios.get('/api/material/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch materials.');
    return null;
  }
};

const updateMaterial = async (id, material) => {
  try {
    let { data } = await axios.patch(
      `/api/material/${id}/`,
      material,
      getHeaders()
    );
    message.success('Updated material.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteMaterial = async (id, callback) => {
  try {
    await await axios.delete(`/api/material/${id}/`, getHeaders());
    message.success('Deleted material.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete material.');
    return false;
  }
};

export { createMaterial, fetchMaterials, updateMaterial, deleteMaterial };
