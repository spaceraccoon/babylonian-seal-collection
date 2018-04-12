import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createScene = async scene => {
  try {
    await axios.post('/api/scene/', scene);
    message.success('Created scene.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchScenes = async () => {
  try {
    const { data } = await axios.get('/api/scene/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch scenes.');
    return null;
  }
};

const updateScene = async (id, scene) => {
  try {
    let { data } = await axios.patch(`/api/scene/${id}/`, scene, getHeaders());
    message.success('Updated scene.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteScene = async (id, callback) => {
  try {
    await await axios.delete(`/api/scene/${id}/`, getHeaders());
    message.success('Deleted scene.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete scene.');
    return false;
  }
};

export { createScene, fetchScenes, updateScene, deleteScene };
