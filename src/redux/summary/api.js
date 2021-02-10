import axios from 'axios';

const DMARC_API = __CONFIG__.api;

const getPrecalculated = (customerId) => {
  const path = `${DMARC_API}/precalculated`;
  return axios.get(path, {
    params: {
      id: customerId,
    },
  })
};

export const summaryApi = {
  getPrecalculated,
};
