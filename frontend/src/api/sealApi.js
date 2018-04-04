import axios from 'axios';
import { message } from 'antd';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await axios.post('/api/auth/token/refresh/', {
        refresh: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('accessToken', data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

const createSeal = async seal => {
  try {
    await axios.post('/api/seal/', seal);
    message.success('Created seal.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchSeal = async id => {
  try {
    const { data } = await axios.get(`/api/seal/${id}/`);
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch seal.');
    return null;
  }
};

const fetchSeals = async () => {
  try {
    const { data } = await axios.get('/api/seal/');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch seals.');
    return null;
  }
};

const updateSeal = async (id, seal) => {
  try {
    await axios.patch(`/api/seal/${id}/`, seal);
    message.success('Updated seal.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const deleteSeal = async (id, callback) => {
  try {
    await await axios.delete(`/api/seal/${id}/`);
    message.success('Deleted seal.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete seal.');
    return false;
  }
};

export { createSeal, fetchSeal, fetchSeals, updateSeal, deleteSeal };
