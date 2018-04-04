const getHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  };
};

export default getHeaders;
