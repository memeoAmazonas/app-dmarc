import axios from 'axios';

const DMARC_API = __CONFIG__.api;

const apiCall = (url, method, params = null, data = null, headers = null) => axios({
  method,
  params,
  url: `${DMARC_API}${url}`,
  data,
  headers: {
    'Content-Type': 'application/json', Accept: 'application/json', ...headers,
  },
});

export default apiCall;
