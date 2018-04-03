import axios from 'axios';
import { message } from 'antd';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const signIn = async loginData => {
  try {
    const { data } = await axios.post('/api/auth/token/obtain/', loginData);
    message.success('Signed in.');
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to sign in.');
    return false;
  }
};

const signOut = () => {
  axios.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const refreshAccessToken = async token => {
  try {
    await axios.post('/api/auth/token/refresh/', {
      refresh: token,
    });
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signOut, refreshAccessToken };
