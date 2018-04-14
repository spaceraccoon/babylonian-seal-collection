import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const setTokenInterceptor = () => {
  const tokenInterceptor = axios.interceptors.response.use(null, error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      originalRequest._retry = true;
      axios.interceptors.response.eject(tokenInterceptor);
      const refreshToken = localStorage.getItem('refreshToken');
      return axios
        .post('/api/auth/token/refresh/', {
          refresh: refreshToken,
        })
        .then(({ data }) => {
          setTokenInterceptor();
          localStorage.setItem('accessToken', data.access);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return axios(originalRequest);
        })
        .catch(error => {
          console.log(error);
          message.error('Failed to authenticate user. Please sign in again.');
        });
    }
    return Promise.reject(error);
  });
};
setTokenInterceptor();

const createSeal = async seal => {
  try {
    let { data } = await axios.post('/api/seal/', seal, getHeaders());
    message.success('Created seal.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const fetchSeal = async id => {
  try {
    const { data } = await axios.get(`/api/seal/${id}/`, getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch seal.');
    return null;
  }
};

const fetchSeals = async () => {
  try {
    const { data } = await axios.get('/api/seal/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch seals.');
    return null;
  }
};

const updateSeal = async (id, seal) => {
  try {
    let { data } = await axios.patch(`/api/seal/${id}/`, seal, getHeaders());
    message.success('Updated seal.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteSeal = async (id, callback) => {
  try {
    await await axios.delete(`/api/seal/${id}/`, getHeaders());
    message.success('Deleted seal.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete seal.');
    return false;
  }
};

export { createSeal, fetchSeal, fetchSeals, updateSeal, deleteSeal };
