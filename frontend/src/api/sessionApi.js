import axios from 'axios';
import { message } from 'antd';

/**
 * Sets X-CSRF headers to communicate with backend.
 */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/**
 * Obtains authentication tokens with provided login data and stores them in
 * localStorage.
 * @param {!Object<string, string>} loginData Contains username and password
 * properties.
 */
const signIn = async loginData => {
  try {
    const { data } = await axios.post('/api/auth/token/obtain/', loginData);
    message.success('Signed in.');
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to sign in.');
    return false;
  }
};

/**
 * Removes authentication tokens from localStorage.
 */
const signOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Attempts to get new accessToken with longer-lasting refreshToken.
 */
const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    const { data } = await axios.post('/api/auth/token/refresh/', {
      refresh,
    });
    localStorage.setItem('accessToken', data.access);
    if (data.refresh) {
      localStorage.setItem('refreshToken', data.refresh);
    }
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signOut, refreshAccessToken };
