import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createPeriod = async period => {
  try {
    await axios.post('/api/period/', period);
    message.success('Created period.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchPeriods = async () => {
  try {
    const { data } = await axios.get('/api/period/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch periods.');
    return null;
  }
};

const updatePeriod = async (id, period) => {
  try {
    let { data } = await axios.patch(
      `/api/period/${id}/`,
      period,
      getHeaders()
    );
    message.success('Updated period.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deletePeriod = async (id, callback) => {
  try {
    await await axios.delete(`/api/period/${id}/`, getHeaders());
    message.success('Deleted period.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete period.');
    return false;
  }
};

export { createPeriod, fetchPeriods, updatePeriod, deletePeriod };
