import axios from 'axios';

const DMARC_API = __CONFIG__.api;
const DMARC_API_PRO = 'https://w38v4fse3k.execute-api.us-east-1.amazonaws.com/Prod';

const setUrl = (url) => {
  if (url.includes('Prod')) return DMARC_API_PRO + url.split('/Prod').join('')
  return `${DMARC_API}${url}`
}

const apiCall = (url, method, params = null, data = null, headers = null) => axios({
  method,
  params,
  url: setUrl(url),
  data,
  headers: {
    'Content-Type': 'application/json', Accept: 'application/json', ...headers,
  },
});


export default apiCall;
