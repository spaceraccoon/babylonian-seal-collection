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
