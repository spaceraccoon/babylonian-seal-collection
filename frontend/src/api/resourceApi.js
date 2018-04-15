import axios from 'axios';
import { message } from 'antd';
import querystring from 'querystring';

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
          if (data.refresh) {
            localStorage.setItem('refreshToken', data.refresh);
          }
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

const createResource = async (resource, resourceName) => {
  try {
    let { data } = await axios.post(
      `/api/${resourceName}/`,
      resource,
      getHeaders()
    );
    message.success(`Created ${resourceName}.`);
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const fetchResource = async (id, resourceName) => {
  try {
    const { data } = await axios.get(
      `/api/${resourceName}/${id}/`,
      getHeaders()
    );
    return data;
  } catch (error) {
    console.error(error);
    message.error(`Failed to fetch ${resourceName}.`);
    return null;
  }
};

const fetchResources = async (resourceName, queries) => {
  try {
    const { data } = await axios.get(
      `/api/${resourceName}/?${querystring.stringify(queries)}`,
      getHeaders()
    );
    return data;
  } catch (error) {
    console.error(error);
    message.error(`Failed to fetch ${resourceName}s.`);
    return null;
  }
};

const updateResource = async (id, resource, resourceName) => {
  try {
    let { data } = await axios.patch(
      `/api/${resourceName}/${id}/`,
      resource,
      getHeaders()
    );
    message.success(`Updated ${resourceName}.`);
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteResource = async (id, resourceName) => {
  try {
    await axios.delete(`/api/${resourceName}/${id}/`, getHeaders());
    message.success(`Deleted ${resourceName}.`);
    return true;
  } catch (error) {
    console.error(error);
    message.error(`Failed to delete ${resourceName}.`);
    return false;
  }
};

export {
  createResource,
  fetchResource,
  fetchResources,
  updateResource,
  deleteResource,
};
