import axios from 'axios';
import { message } from 'antd';

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
 * Fetches a signed S3 url to perform operations on the client side. See
 * http://boto3.readthedocs.io/en/latest/guide/s3.html#generating-presigned-urls.
 * @param {string} clientMethod
 * @param {string} fileName
 * @param {string} fileType
 */
const fetchSignedUrl = async (clientMethod, fileName, fileType) => {
  try {
    const { data } = await axios.post(
      `/api/image/sign-s3/`,
      {
        clientMethod,
        fileName,
        fileType,
      },
      getHeaders()
    );
    return data;
  } catch (error) {
    console.error(error);
    message.error(`Failed to fetch signed URL.`);
    return null;
  }
};

export { fetchSignedUrl };
