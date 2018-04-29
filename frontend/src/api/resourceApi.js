import axios from 'axios';
import { message } from 'antd';
import querystring from 'querystring';

import getHeaders from '../utils/getHeaders';

/**
 * Sets X-CSRF headers to communicate with backend.
 */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Intercepts an invalid token error and attempts to refresh accessToken with
 * the longer-lasting refreshToken before retrying the previous request. Since
 * refreshing accessToken requires another API call, it first disables the
 * interceptor before setting it again on successful refresh.
 */
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
          console.error(error);
          message.error('Failed to authenticate user. Please sign in again.');
        });
    }
    return Promise.reject(error);
  });
};
setTokenInterceptor();

/**
 * Sends a POST request to the resource API to create a new resource.
 * @param {!Object} resource Data of resource to create.
 * @param {string} resourceName This is the URL endpoint for the resource rather
 * than the model name.
 */
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

/**
 * Sends a GET request to the resource API to retrieve resource detail data.
 * @param {number|string} id Database ID of the resource to fetch.
 * @param {string} resourceName This is the URL endpoint for the resource rather
 * than the model name.
 */
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

/**
 * Sends a GET request to fetch the list data of all instances of a resource.
 * Can add additional filter queries if enabled on the backend; see
 * http://www.django-rest-framework.org/api-guide/filtering/.
 * @param {string} resourceName This is the URL endpoint for the resource rather
 * than the model name.
 * @param {!Object} queries Object to serialize into a URL query string. See
 * https://nodejs.org/api/querystring.html.
 */
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

/**
 * Sends a PATCH request to the resource API to update a resouce.
 * @param {number|string} id Database ID of the resource to update.
 * @param {!Object} resource Updated data of resource.
 * @param {string} resourceName This is the URL endpoint for the resource rather
 * than the model name.
 */
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

/**
 * Sends a DELETE request to the resource API to delete a resouce.
 * @param {number|string} id Database ID of the resource to delete.
 * @param {string} resourceName This is the URL endpoint for the resource rather
 * than the model name.
 */
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
