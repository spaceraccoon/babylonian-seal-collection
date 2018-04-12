import axios from 'axios';
import { message } from 'antd';

import getHeaders from '../utils/getHeaders';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createIconographicElement = async iconongraphicElement => {
  try {
    await axios.post('/api/iconographicelement/', iconongraphicElement);
    message.success('Created iconographic element.');
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
  }
};

const fetchIconographicElements = async () => {
  try {
    const { data } = await axios.get('/api/iconographicelement/', getHeaders());
    return data;
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch iconographic elements.');
    return null;
  }
};

const updateIconographicElement = async (id, iconongraphicElement) => {
  try {
    let { data } = await axios.patch(
      `/api/iconographicelement/${id}/`,
      iconongraphicElement,
      getHeaders()
    );
    message.success('Updated iconographic element.');
    return data;
  } catch (error) {
    console.error(error);
    message.error('Invalid data. Please check form fields.');
    return null;
  }
};

const deleteIconographicElement = async (id, callback) => {
  try {
    await await axios.delete(`/api/iconographicelement/${id}/`, getHeaders());
    message.success('Deleted iconographic element.');
    return true;
  } catch (error) {
    console.error(error);
    message.error('Failed to delete iconographic element.');
    return false;
  }
};

export {
  createIconographicElement,
  fetchIconographicElements,
  updateIconographicElement,
  deleteIconographicElement,
};
