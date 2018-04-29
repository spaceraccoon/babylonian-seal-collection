/**
 * Returns the options object that includes the Authorization header for
 * axios requests to the API.
 */
const getHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  };
};

export default getHeaders;
